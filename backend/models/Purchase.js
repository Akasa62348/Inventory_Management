const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  supplierName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    quantity: Number,
    total: Number,
  }],
  totalAmount: Number,
}, { timestamps: true });

module.exports = mongoose.model('Purchase', purchaseSchema);
