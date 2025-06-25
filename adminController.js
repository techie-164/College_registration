const Student = require('../models/Student');

// Get all ECE requests (not approved)
const getECERequests = async (req, res) => {
  try {
    const pending = await Student.find({ branch: 'ECE', isApproved: false });
    res.status(200).json(pending);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all ECE approved students
const getECEApproved = async (req, res) => {
  try {
    const approved = await Student.find({ branch: 'ECE', isApproved: true });
    res.status(200).json(approved);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Approve student (using ID from body)
const approveStudent = async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ error: 'Student ID required' });

  try {
    const updated = await Student.findByIdAndUpdate(id, { isApproved: true });
    if (!updated) return res.status(404).json({ error: 'Student not found' });

    res.status(200).json({ message: 'Student approved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getECERequests,
  getECEApproved,
  approveStudent
};
