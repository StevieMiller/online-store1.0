const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  condition: String,
  size: String,
  color: String,
  description: String,
  images: [String],
  inventory: { type: Number, default: 1 }
});

module.exports = mongoose.model('Product', productSchema);