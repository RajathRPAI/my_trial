const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
  stem: { type: String, required: true },
  type: { type: String, enum: ['mcq','msq','numeric','short'], default: 'mcq' },
  options: [{ type: String }],
  answer: mongoose.Schema.Types.Mixed,
  solution: { type: String },
  tags: [{ type: String }],
  difficulty: { type: Number, default: 3 },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Question', questionSchema);
