const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // process.env.MONGO_URI will look for your connection string in the .env file
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        console.log(`MongoDB Connected successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit the process with failure if it can't connect
    }
};

module.exports = connectDB;