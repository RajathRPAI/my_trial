const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try{
    const { name, email, password } = req.body;
    const existed = await User.findOne({ email });
    if(existed) return res.status(400).json({ message: 'User exists' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });
    res.json({ token, user: { name: user.name, email: user.email, id: user._id, role: user.role } });
  } catch(err){ res.status(500).json({ error: err.message }); }
};

exports.login = async (req, res) => {
  try{
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ message: 'Invalid creds' });
    const valid = await bcrypt.compare(password, user.password);
    if(!valid) return res.status(400).json({ message: 'Invalid creds' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });
    res.json({ token, user: { name: user.name, email: user.email, id: user._id, role: user.role } });
  } catch(err){ res.status(500).json({ error: err.message }); }
};

exports.me = async (req, res) => {
  try{
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch(err){ res.status(500).json({ error: err.message }); }
};
