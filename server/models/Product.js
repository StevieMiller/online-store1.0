const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  condition: String,
  size: String,   // changed
  color: String,  // changed
  description: String,
  images: [String],
  inventory: { type: Number, default: 1 },
  sku: String,
});

module.exports = mongoose.model('Product', productSchema);