const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db.js'); // 1. Import the database configuration

const app = express();

// 2. Connect to the Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Allows your server to accept JSON data in requests

// 1. IMPORT ROUTES
const projectRoutes = require('./routes/projectRoutes');
const messageRoutes = require('./routes/messageRoutes');

// 2. LINK ROUTES TO URL PATHS
app.use('/api/projects', projectRoutes);
app.use('/api/messages', messageRoutes);

// Test Route to make sure the backend works
app.get('/', (req, res) => {
    res.send('Server is up and running smoothly!');
});

const PORT = process.env.PORT || 5000;
// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});