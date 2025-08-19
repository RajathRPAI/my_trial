const jwt = require('jsonwebtoken');
module.exports = function(req, res, next){
  const header = req.headers['authorization'];
  if(!header) return res.status(401).json({ message: 'No token' });
  const token = header.split(' ')[1];
  if(!token) return res.status(401).json({ message: 'No token' });
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    req.userId = decoded.id;
    next();
  } catch(err){
    res.status(401).json({ message: 'Invalid token' });
  }
};
