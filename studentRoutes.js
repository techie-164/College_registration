const express = require('express');
const router = express.Router();
const {
  registerStudent,
  loginStudent,
  registerForCourse,
  getECERequests,
  getECEApproved,
  approveStudent
} = require('../controllers/studentController');

// Signup
router.post('/signup', registerStudent);

// Login
router.post('/login', loginStudent);

// Register for ECE course
router.post('/register-course', registerForCourse);

// Admin
router.get('/admin/ece/requests', getECERequests);
router.get('/admin/ece/approved', getECEApproved);
router.post('/admin/ece/approve', approveStudent);

module.exports = router;

