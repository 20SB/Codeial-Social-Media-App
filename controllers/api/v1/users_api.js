// Import required dependencies
const User = require('../../../models/user'); // Import the User model
const jwt = require('jsonwebtoken'); // Import the JWT library

// Controller function to create a session (sign in)
module.exports.createSession = async function(req, res) {
    try {
        // Find a user in the database based on the provided email
        let user = await User.findOne({ email: req.body.email });

        // Check if the user doesn't exist or the password doesn't match
        if (!user || user.password !== req.body.password) {
            return res.json(422, {
                message: 'Invalid username or password'
            });
        }

        // If user is found and password matches, create a JWT token for the user
        return res.json(200, {
            message: 'Sign In Successful, here is your token, keep it safe!!',
            data: {
                token: jwt.sign(user.toJSON(), 'codeial', { expiresIn: '100000' }) // Create a JWT token
            }
        });
    } catch (err) {
        console.log('Error:', err);

        // If an error occurs during processing, return an internal server error response
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
}
