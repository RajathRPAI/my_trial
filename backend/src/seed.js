const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const Question = require('./models/Question');
const Mock = require('./models/Mock');
const User = require('./models/User');

async function seed(){
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern-mock');
  await Question.deleteMany({});
  await Mock.deleteMany({});
  await User.deleteMany({});
  const q1 = await Question.create({ stem: '2 + 2 = ?', options: ['3','4','5'], answer: 1, type: 'mcq' });
  const q2 = await Question.create({ stem: 'Capital of France?', options: ['Berlin','Paris','Rome'], answer: 1, type: 'mcq' });
  const mock = await Mock.create({ title: 'Sample Test', sections: [{ name: 'General', questionIds: [q1._id, q2._id] }], config: { time: 5, marksPerQ: 1 } });
  const admin = await User.create({ name: 'Admin', email: 'admin@example.com', password: await require('bcryptjs').hash('admin123',10), role: 'admin' });
  console.log('Seed created. Admin login -> admin@example.com / admin123, mock id:', mock._id);
  process.exit();
}
seed();
