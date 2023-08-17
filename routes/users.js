const express = require('express');
const router = express.Router();
const passport = require('passport');

// Import the users controller
const usersController = require('../controllers/users_controller');

// Route to user profile page, accessible only if authenticated
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);

// Route to sign-up page
router.get('/sign-up', usersController.signUp);

// Route to sign-in page
router.get('/sign-in', usersController.signIn);

// Route to create a new user
router.post('/create', usersController.create);

// Route to create a session (sign-in), using local strategy
router.post('/create-session', passport.authenticate(
    'local', 
    { failureRedirect: '/users/sign-in' } // Redirect to sign-in page if authentication fails
), usersController.createSession);

// Route to sign out and destroy the session
router.get('/sign-out', usersController.destroySession);

// Export the router to be used in the main router (index.js)
module.exports = router;
