const mongoose = require('mongoose');
const attemptSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mock: { type: mongoose.Schema.Types.ObjectId, ref: 'Mock', required: true },
  responses: [{ question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' }, answer: mongoose.Schema.Types.Mixed, correct: Boolean, timeTaken: Number }],
  score: { type: Number, default: 0 },
  startedAt: { type: Date, default: Date.now },
  lastSavedAt: { type: Date },
  finishedAt: { type: Date }
});
module.exports = mongoose.model('Attempt', attemptSchema);
