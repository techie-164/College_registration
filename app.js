const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
const studentRoutes = require('./routes/studentRoutes');
const adminRoutes = require('./routes/adminRoutes'); // ✅ Admin routes added

app.use('/api', studentRoutes);         // Student routes at /api
app.use('/api/admin', adminRoutes);     // Admin routes at /api/admin

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Default route
app.get('/', (req, res) => {
  res.send('Student Registration Backend Running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});



