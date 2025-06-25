const Student = require('../models/Student');

// Student Signup
const registerStudent = async (req, res) => {
  console.log("Test");
  const { name, username, password, branch, collegeId } = req.body;

  if (!name || !username || !password || !branch || !collegeId) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existingUser = await Student.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const newStudent = new Student({
      name, username, password, branch, collegeId, isApproved: false
    });

    await newStudent.save();
    res.status(201).json({ message: 'Registration submitted successfully' });

  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Login Student
const loginStudent = async (req, res) => {
  const { username, password } = req.body;

  try {
    const student = await Student.findOne({ username });
    if (!student || student.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful', student });

  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Register for ECE course
const registerForCourse = async (req, res) => {
  const { username, branch } = req.body;

  if (branch !== 'ECE') {
    return res.status(400).json({ error: 'Only ECE branch is supported currently' });
  }

  try {
    const student = await Student.findOne({ username });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    student.branch = 'ECE';
    await student.save();

    res.status(200).json({ message: 'Course registration successful' });

  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Admin: Get all ECE requests (not approved)
const getECERequests = async (req, res) => {
  try {
    const requests = await Student.find({ branch: 'ECE', isApproved: false });
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Admin: Get all approved ECE students
const getECEApproved = async (req, res) => {
  try {
    const approved = await Student.find({ branch: 'ECE', isApproved: true });
    res.status(200).json(approved);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Admin: Approve a student by ID
const approveStudent = async (req, res) => {
  const { id } = req.body;

  try {
    await Student.findByIdAndUpdate(id, { isApproved: true });
    res.status(200).json({ message: 'Student approved' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  registerStudent,
  loginStudent,
  registerForCourse,
  getECERequests,
  getECEApproved,
  approveStudent
};



