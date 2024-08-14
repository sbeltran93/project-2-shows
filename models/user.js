const mongoose = require('mongoose');

const tvshowSchema = new mongoose.Schema({
  title: { type: String, required: true},
  rating: { type: Number, required: true},
});
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  showCase: [tvshowSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
