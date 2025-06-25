const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  password: String,
  branch: String,
  collegeId: String,
  isApproved: { type: Boolean, default: false }
});

module.exports = mongoose.model('Student', studentSchema);
