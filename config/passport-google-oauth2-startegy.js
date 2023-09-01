// Import necessary modules and packages
const passport = require('passport'); // Import passport library for authentication
const googleStrategy = require('passport-google-oauth').OAuth2Strategy; // Import Google OAuth2Strategy for passport
const crypto = require('crypto'); // Import crypto library for generating random passwords
const User = require('../models/user'); // Import the User model from a specific location

const env = require('./environment');

// Import GoogleStrategy from passport-google-oauth20 for Google login
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Configure Google OAuth2 authentication strategy
passport.use(new GoogleStrategy({
    clientID: env.google_client_id, // Google client ID
    clientSecret: env.google_client_secret, // Google client secret
    callbackURL: env.google_call_back_url, // Callback URL after successful authentication
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Find a user based on the email from the Google profile
        const user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
            // If user exists, set this user as the authenticated user (req.user)
            return done(null, user);
        } else {
            // If user doesn't exist, create a new user
            const newUser = await User.create({
                name: profile.displayName, // Use the display name from the Google profile
                email: profile.emails[0].value, // Use the email from the Google profile
                password: crypto.randomBytes(20).toString('hex') // Generate a random password
            });

            // Set the newly created user as the authenticated user (req.user)
            return done(null, newUser);
        }
    } catch (err) {
        console.log('Error in Google strategy-passport:', err); // Log any errors that occur
        return done(err); // Pass the error to the authentication process
    }
}));

// Export the configured passport instance
module.exports = passport;
