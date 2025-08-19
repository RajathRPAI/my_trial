const Attempt = require('../models/Attempt');
const Mock = require('../models/Mock');
const Question = require('../models/Question');

function isCorrect(question, given){
  if(!question) return false;
  const type = question.type;
  if(type === 'mcq' || type === 'numeric' || type === 'short'){
    return JSON.stringify(question.answer) === JSON.stringify(given);
  }
  if(type === 'msq'){
    const a = Array.isArray(question.answer) ? question.answer.slice().sort() : [question.answer];
    const b = Array.isArray(given) ? given.slice().sort() : [given];
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return false;
}

exports.start = async (req, res) => {
  try{
    const { mockId } = req.body;
    const mock = await Mock.findById(mockId).populate({ path: 'sections.questionIds', model: 'Question' });
    if(!mock) return res.status(404).json({ message: 'Mock not found' });
    const attempt = await Attempt.create({ user: req.userId, mock: mockId });
    const populated = mock.toObject();
    populated.sections = populated.sections.map(s => ({ ...s, questionObjs: s.questionIds }));
    res.json({ attemptId: attempt._id, mock: populated });
  } catch(err){ res.status(500).json({ error: err.message }); }
};

exports.autosave = async (req, res) => {
  try{
    const { attemptId, responses } = req.body;
    const attempt = await Attempt.findById(attemptId);
    if(!attempt) return res.status(404).json({ message: 'Attempt not found' });
    const map = new Map();
    attempt.responses.forEach(r => map.set(String(r.question), r));
    (responses || []).forEach(r => map.set(String(r.question), { question: r.question, answer: r.answer, timeTaken: r.timeTaken }));
    attempt.responses = Array.from(map.values());
    attempt.lastSavedAt = new Date();
    await attempt.save();
    res.json({ message: 'Saved', lastSavedAt: attempt.lastSavedAt });
  } catch(err){ res.status(500).json({ error: err.message }); }
};

exports.submit = async (req, res) => {
  try{
    const { attemptId } = req.body;
    const attempt = await Attempt.findById(attemptId).populate({ path: 'responses.question', model: 'Question' });
    if(!attempt) return res.status(404).json({ message: 'Attempt not found' });
    let score = 0;
    const marksPerQ = 1;
    const negative = 0;
    for(const r of attempt.responses){
      const q = r.question;
      const correct = isCorrect(q, r.answer);
      r.correct = correct;
      if(correct) score += marksPerQ;
      else score -= negative;
    }
    attempt.score = score;
    attempt.finishedAt = new Date();
    await attempt.save();
    res.json({ attemptId: attempt._id, score: attempt.score, finishedAt: attempt.finishedAt, responses: attempt.responses });
  } catch(err){ res.status(500).json({ error: err.message }); }
};

exports.getOne = async (req, res) => {
  try{ const attempt = await Attempt.findById(req.params.id).populate({ path: 'responses.question', model: 'Question' }); if(!attempt) return res.status(404).json({ message: 'Not found' }); res.json(attempt); } catch(err){ res.status(500).json({ error: err.message }); }
};

exports.listForUser = async (req, res) => { try{ const attempts = await Attempt.find({ user: req.userId }).populate('mock'); res.json(attempts); } catch(err){ res.status(500).json({ error: err.message }); } };

exports.listAll = async (req, res) => { try{ const attempts = await Attempt.find().populate('user').populate('mock'); res.json(attempts); } catch(err){ res.status(500).json({ error: err.message }); } };
