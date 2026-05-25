const express = require('express');
const router = express.Router();
const Message = require('../models/Message'); // Import our Message blueprint

// @route   POST /api/messages
// @desc    Submit contact form from public portfolio site
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        const newMessage = new Message({
            name,
            email,
            subject,
            message
        });

        const savedMessage = await newMessage.save();
        res.status(201).json({ success: true, data: savedMessage });
    } catch (error) {
        res.status(400).json({ message: error.message || 'Failed to send message' });
    }
});

// @route   GET /api/messages
// @desc    View all contact submissions in the private Admin Dashboard
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: Could not fetch messages' });
    }
});

module.exports = router;