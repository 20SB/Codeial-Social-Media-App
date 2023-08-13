const mongoose = require('mongoose');

// Define a schema for the 'Contact' model
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    }
    
}, {
    timestamps: true
});

// Create a model or collection named 'user' using the defined schema
const User = mongoose.model('User', userSchema);

// Export the 'user' model or collection so it can be used in other files
module.exports = User;
