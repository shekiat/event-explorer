const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  date: { type: String, required: true },
  venue: { type: String, required: true },
  url: { type: String, required: true },
  images: { type: Array, default: [] },
});

module.exports = mongoose.model('Favorite', favoriteSchema);