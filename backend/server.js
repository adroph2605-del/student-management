// ============================================
// Student Management System - Backend Server
// Auspify Full Stack Development - Task 2
// ============================================
// TODO: Implement the full server logic here
// ============================================

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// TODO: Import and use student routes
// const studentRoutes = require('./routes/students');
// app.use('/api/students', studentRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Student Management System API is running' });
});

// Connect to MongoDB and start server
// TODO: Add MongoDB connection logic
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => {
//     console.log('Connected to MongoDB');
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
