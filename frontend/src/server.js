const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth.routes');
const questionRoutes = require('./routes/question.routes');
const mockRoutes = require('./routes/mock.routes');
const attemptRoutes = require('./routes/attempt.routes');

app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/mocks', mockRoutes);
app.use('/api/attempts', attemptRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern-mock', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>{
    console.log('Mongo connected');
    app.listen(PORT, ()=> console.log('Server running on', PORT));
  })
  .catch(err => console.error(err));
