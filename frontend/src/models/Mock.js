const mongoose = require('mongoose');
const mockSchema = new mongoose.Schema({
  title: { type: String, required: true },
  sections: [{ name: String, questionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }], timeLimit: Number }],
  config: { time: Number, marksPerQ: Number, negativeMarks: Number },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Mock', mockSchema);
