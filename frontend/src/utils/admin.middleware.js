const User = require('../models/User');
module.exports = async function(req, res, next){
  try{
    const user = await User.findById(req.userId);
    if(!user) return res.status(401).json({ message: 'User not found' });
    if(user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
    next();
  } catch(err){ res.status(500).json({ error: err.message }); }
};
