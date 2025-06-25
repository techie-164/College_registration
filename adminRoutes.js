const express = require('express');
const router = express.Router();
const {
  getECERequests,
  getECEApproved,
  approveStudent
} = require('../controllers/adminController');

// GET all pending ECE registrations
router.get('/ece/requests', getECERequests);

// GET all approved ECE students
router.get('/ece/approved', getECEApproved);

// POST approve student
router.post('/ece/approve', approveStudent);

module.exports = router;
