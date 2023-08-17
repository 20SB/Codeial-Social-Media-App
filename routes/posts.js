// Import required modules
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Import the posts controller
const postsController = require('../controllers/posts_controller');

// Define routes and associate them with controller actions
// POST request to create a new post
router.post('/create', passport.checkAuthentication, postsController.create);

// GET request to delete a post by its ID
router.get('/destroy/:id', passport.checkAuthentication, postsController.destroy);

// Export the router to be used in other parts of the application
module.exports = router;
