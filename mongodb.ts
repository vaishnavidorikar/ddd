const mongoose = require('mongoose');

const mongoURI = 'mongodb://127.0.0.1:27017/vibeDB'; 

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(' Connected to local MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));
