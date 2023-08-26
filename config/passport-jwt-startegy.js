// Import the required dependencies
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user'); // Import your User model

// Configure options for the JWT authentication strategy
let opts = {
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(), // Extract JWT from Authorization header with Bearer token
    secretOrKey: 'codeial' // Secret key to verify JWT signature
}

// Create a new JWT authentication strategy
passport.use(new JWTStrategy(opts, async function(jwtPayload, done) {
    try {
        // Attempt to find a user in the database based on the user ID stored in the JWT payload
        const user = await User.findById(jwtPayload._id);

        // If user not found, return failure to indicate unsuccessful authentication
        if (!user) {
            console.log('Error in finding user from JWT');
            return done(null, false);
        }

        // Return the user object to indicate successful authentication
        return done(null, user);

    } catch (err) {
        // If an error occurs during database query or processing, log the error
        console.log('Error in finding user from JWT:', err);

        // Pass the error to the 'done' callback along with 'false' to indicate authentication failure
        return done(err, false);
    }
}));

// Export the configured passport with the JWT authentication strategy
module.exports = passport;
