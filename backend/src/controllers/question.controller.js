const Question = require('../models/Question');
exports.create = async (req, res) => {
  try { const q = await Question.create(req.body); res.json(q); } catch(err){ res.status(500).json({ error: err.message }); }
};
exports.getAll = async (req, res) => { try{ const qs = await Question.find(); res.json(qs); } catch(err){ res.status(500).json({ error: err.message }); } };
exports.getOne = async (req, res) => { try{ const q = await Question.findById(req.params.id); if(!q) return res.status(404).json({ message: 'Not found' }); res.json(q); } catch(err){ res.status(500).json({ error: err.message }); } };
exports.delete = async (req, res) => { try{ await Question.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); } catch(err){ res.status(500).json({ error: err.message }); } };
