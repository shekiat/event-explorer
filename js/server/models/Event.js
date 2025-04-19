
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  id: String,
  name: String,
  date: String,
  venue: String,
  url: String
});

module.exports = mongoose.model('Event', eventSchema);
