const Mock = require('../models/Mock');
exports.create = async (req, res) => { try{ const mock = await Mock.create(req.body); res.json(mock); } catch(err){ res.status(500).json({ error: err.message }); } };
exports.getAll = async (req, res) => { try{ const mocks = await Mock.find(); res.json(mocks); } catch(err){ res.status(500).json({ error: err.message }); } };
exports.getOne = async (req, res) => {
  try{
    const mock = await Mock.findById(req.params.id).populate({ path: 'sections.questionIds', model: 'Question' });
    if(!mock) return res.status(404).json({ message: 'Not found' });
    const populated = mock.toObject();
    populated.sections = populated.sections.map(s => ({ ...s, questionObjs: s.questionIds }));
    res.json(populated);
  } catch(err){ res.status(500).json({ error: err.message }); }
};
