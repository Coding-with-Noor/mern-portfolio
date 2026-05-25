// const express = require('express');
// const router = express.Router();
// const Project = require('../models/Project'); // Import our Project blueprint

// // @route   GET /api/projects
// // @desc    Get all projects for the public portfolio
// router.get('/', async (req, res) => {
//     try {
//         // Sort by newest created project first
//         const projects = await Project.find().sort({ createdAt: -1 });
//         res.status(200).json(projects);
//     } catch (error) {
//         res.status(500).json({ message: 'Server Error: Could not fetch projects' });
//     }
// });

// // @route   POST /api/projects
// // @desc    Add a new project from the Admin Dashboard
// router.post('/', async (req, res) => {
//     try {
//         const { title, description, techStack, githubLink } = req.body;
//         // Create a new instance using our schema data
//         const newProject = new Project({
//             title,
//             description,
//             techStack, // Expecting an array of strings like ['React', 'Node']
//             githubLink
//         });

//         const savedProject = await newProject.save();
//         res.status(201).json(savedProject);
//     } catch (error) {
//         res.status(400).json({ message: error.message || 'Validation failed' });
//     }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
// Import your database model
const Project = require('../models/Project'); 

// 1. GET ALL PROJECTS (Existing)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. CREATE A PROJECT (Existing)
router.post('/', async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 3. EDIT/UPDATE ROUTE (Make sure this exact block exists!)
router.put('/:id', async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found in MongoDB." });
    }
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 4. DELETE ROUTE (Make sure this exact block exists!)
router.delete('/:id', async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found in MongoDB." });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;