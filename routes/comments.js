// Import required modules
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Import the comments controller
const commentsController = require('../controllers/comments_controller');

// Define routes and associate them with controller actions
// POST request to create a new comment
router.post('/create', passport.checkAuthentication, commentsController.create);

// GET request to delete a comment by its ID
router.get('/destroy/:id', passport.checkAuthentication, commentsController.destroy);

// Export the router to be used in other parts of the application
module.exports = router;
