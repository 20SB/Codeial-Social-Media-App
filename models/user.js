// Import the mongoose library
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');


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
    },
    avatar: {
        type: String
    }
}, {
    timestamps: true // Automatically adds 'createdAt' and 'updatedAt' fields
});

// Create a disk storage configuration for Multer
let storage = multer.diskStorage({
    // Set the destination where uploaded files will be stored
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    // Define the filename for uploaded files
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

// Define static functions on the userSchema model
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

// Create a model named 'User' using the userSchema
const User = mongoose.model('User', userSchema);

// Export the 'User' model to be used in other parts of the application
module.exports = User;
