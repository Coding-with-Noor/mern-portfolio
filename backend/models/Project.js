const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a project title'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    techStack: {
        type: [String], // Array of strings (e.g., ['React', 'Node.js', 'MongoDB'])
        required: [true, 'Please add the technologies used']
    },
    githubLink: {
        type: String,
        required: [true, 'Please add a GitHub repository link']
    }
}, {
    timestamps: true // Automatically creates 'createdAt' and 'updatedAt' fields
});

module.exports = mongoose.model('Project', ProjectSchema);