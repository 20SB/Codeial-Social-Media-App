const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user'); // Import your User model

// Authentication using Passport
passport.use(new LocalStrategy({
    usernameField: 'email' // Use 'email' field as the username
}, async function(email, password, done) {
    try {
        // Find the user by email using the User model
        const user = await User.findOne({ email: email });

        // If user not found or password doesn't match, return failure
        if (!user || user.password !== password) {
            console.log('Invalid password');
            return done(null, false);
        }
        
        // Return the user object to indicate successful authentication
        return done(null, user);
    } catch (err) {
        // Handle any errors that might occur during the async operations
        console.log('Error in finding user ---> Passport');
        return done(err);
    }
}));

// Serialize the user to store in session (cookies)
passport.serializeUser(function(user, done) {
    done(null, user.id); // Store user's ID in the session
});

// Deserialize the user from the stored session (cookies)
passport.deserializeUser(async function(id, done) {
    try {
        // Find the user by their ID using the User model
        const user = await User.findById(id);

        // If user not found, return a failure response
        if (!user) {
            console.log('User not found');
            return done(null, false);
        }

        // Return the user object to indicate successful deserialization
        return done(null, user);
    } catch (err) {
        // Handle any errors that might occur during the async operations
        console.log('Error in finding user ---> Passport');
        return done(err);
    }
});

module.exports = passport; // Export the configured passport
