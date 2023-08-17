const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user'); // Import your User model

// Authentication using Passport
passport.use(new LocalStrategy({
    usernameField: 'email', // Use 'email' field as the username
    passReqToCallback: true
}, async function(req, email, password, done) {
    try {
        // Find the user by email using the User model
        const user = await User.findOne({ email: email });

        // If user not found or password doesn't match, return failure
        if (!user || user.password !== password) {
            req.flash('error', 'Invalid Username/Password')
            console.log('Invalid password');
            return done(null, false);
        }
        
        // Return the user object to indicate successful authentication
        return done(null, user);
    } catch (err) {
        // Handle any errors that might occur during the async operations
        console.log('Error in finding user ---> Passport');
        req.flash('error', err)
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

// check if user is authenticated     
passport.checkAuthentication = function(req,res,next){
    // if the user is signed in, then pass on the request to the next function (controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport; // Export the configured passport
