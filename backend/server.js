// 1. Load environment variables FIRST before any configurations read them
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.js'); 

// 2. Initialize the Express application instance
const app = express();

// 3. Connect to MongoDB Atlas using the loaded URI string
connectDB();

// 4. Secure CORS Configuration Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', 
  credentials: true
}));

// 5. Global Parsers
app.use(express.json()); 

// 6. Import Routes
const projectRoutes = require('./routes/projectRoutes');
const messageRoutes = require('./routes/messageRoutes');

// 7. Link Routes to URL Paths
app.use('/api/projects', projectRoutes);
app.use('/api/messages', messageRoutes);

// Base Deployment Smoke Test Route
app.get('/', (req, res) => {
    res.send('Server is up and running smoothly!');
});

// 8. Bind Server Port Execution
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});