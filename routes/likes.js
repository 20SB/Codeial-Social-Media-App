// Import the necessary modules
const express = require('express');
const router = express.Router(); // Create a new router instance
const likesController = require('../controllers/likes_controller'); // Import the likes controller module

// Define a POST route to toggle likes
router.post('/toggle', likesController.toggleLike);

// Export the router to make it available for use in other parts of the application
module.exports = router;
