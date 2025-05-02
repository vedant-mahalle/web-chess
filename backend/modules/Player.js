const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  rating: { type: Number, default: 1200 },
});

module.exports = mongoose.model('Player', PlayerSchema);
