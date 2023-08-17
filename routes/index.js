const express = require('express');
const router = express.Router();

// Import the home controller
const homeController = require('../controllers/home_controller');

// Route for the home page
router.get('/', homeController.home);

// Use the users router for handling user-related routes
router.use('/users', require('./users'));

// Use the posts router for handling post-related routes
router.use('/posts', require('./posts'));

// Use the comments router for handling comment-related routes
router.use('/comments', require('./comments'));

// You can add more routers for other parts of your application

// Export the main router to be used in your application
module.exports = router;
