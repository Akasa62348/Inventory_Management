const Purchase = require('../models/Purchase');
const Product = require('../models/Product');

// Create purchase
exports.createPurchase = async (req, res) => {
  try {
    const { supplierName, phone, address, products } = req.body;

    if (!phone || !address) {
      return res.status(400).json({ message: 'Phone and address are required.' });
    }

    const productDetails = await Promise.all(products.map(async ({ productId, quantity }) => {
      const product = await Product.findById(productId);
      if (!product) throw new Error(`Product with ID ${productId} not found.`);

      product.quantity += quantity;  // Increase stock on purchase
      await product.save();

      return { product: product._id, name: product.name, price: product.price, quantity, total: product.price * quantity };
    }));

    const totalAmount = productDetails.reduce((acc, item) => acc + item.total, 0);
    const purchase = new Purchase({ supplierName, phone, address, products: productDetails, totalAmount });
    await purchase.save();

    res.status(201).json({ message: 'Purchase recorded successfully.', purchase });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fetch purchases
exports.getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find().populate('products.product');
    res.json(purchases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fetch single purchase by Id
exports.getPurchaseById = async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id).populate('products.product');
    if (!purchase) return res.status(404).json({ message: 'Purchase not found.' });
    res.json(purchase);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

