const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please enter your email address'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email address'
        ]
    },
    subject: {
        type: String,
        default: 'General Inquiry'
    },
    message: {
        type: String,
        required: [true, 'Please type your message']
    }
}, {
    timestamps: true // Tracks exactly when the recruiter or visitor messaged you
});

module.exports = mongoose.model('Message', MessageSchema);