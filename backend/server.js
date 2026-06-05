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
app.use(express.urlencoded({ extended: true })); // Handles URL-encoded form submissions safely

// 6. Import Routes
const projectRoutes = require('./routes/projectRoutes');
const messageRoutes = require('./routes/messageRoutes');

// 7. Link Routes to URL Paths
app.use('/api/projects', projectRoutes);
app.use('/api/messages', messageRoutes);

// Base Deployment Smoke Test Route
app.get('/', (req, res) => {
    res.status(200).json({ status: "success", message: 'Server is up and running smoothly!' });
});

// 8. Global Error Handling Middleware (Catches unhandled errors in async route handlers)
app.use((err, req, res, next) => {
    console.error(`[Error]: ${err.stack}`);
    res.status(err.status || 500).json({
        status: "error",
        message: err.message || "Internal Server Error"
    });
});

// 9. Handle 404 - Route Not Found (Catch-all for invalid URLs)
app.use((req, res) => {
    res.status(404).json({ status: "error", message: "Route not found" });
});

// 10. Bind Server Port Execution
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

// 11. Graceful Shutdown & Unhandled Rejection Safety Nets
process.on('unhandledRejection', (err) => {
    console.error(`Unhandled Rejection Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});