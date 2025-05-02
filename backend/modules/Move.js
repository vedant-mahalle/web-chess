const mongoose = require('mongoose');

const MoveSchema = new mongoose.Schema({
  from: String,
  to: String,
  piece: String,
  timestamp: { type: Date, default: Date.now },
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
});

module.exports = mongoose.model('Move', MoveSchema);
