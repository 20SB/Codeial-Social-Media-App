// Import the mongoose library
const mongoose = require('mongoose');

// Define a schema for the 'User' model
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true // Ensures that each email is unique in the database
    },
    password: {
        type: String,
        required: true,
        unique: true // Ensures that each password is unique in the database (not typical for passwords)
    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Automatically adds 'createdAt' and 'updatedAt' fields
});

// Create a model named 'User' using the userSchema
const User = mongoose.model('User', userSchema);

// Export the 'User' model to be used in other parts of the application
module.exports = User;
