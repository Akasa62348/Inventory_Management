const Sale = require('../models/Sale');
const Product = require('../models/Product');

// Create sale
exports.createSale = async (req, res) => {
  try {
    const { customerName, phone, address, products } = req.body;

    if (!phone || !address) {
      return res.status(400).json({ message: 'Phone and address are required.' });
    }

    const productDetails = await Promise.all(products.map(async ({ productId, quantity }) => {
      const product = await Product.findById(productId);
      if (!product) throw new Error(`Product with ID ${productId} not found.`);
      if (product.quantity < quantity) throw new Error(`Insufficient stock for ${product.name}.`);

      product.quantity -= quantity;
      await product.save();

      return { product: product._id, name: product.name, price: product.price, quantity, total: product.price * quantity };
    }));

    const totalAmount = productDetails.reduce((acc, item) => acc + item.total, 0);
    const sale = new Sale({ customerName, phone, address, products: productDetails, totalAmount });
    await sale.save();

    res.status(201).json({ message: 'Sale recorded successfully.', sale });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fetch sales
exports.getSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate('products.product');
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Fetch single sale by ID
exports.getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id).populate('products.product');
    if (!sale) return res.status(404).json({ message: 'Sale not found.' });
    res.json(sale);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

