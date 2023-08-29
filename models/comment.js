// Import the mongoose library
const mongoose = require('mongoose');

// Define the schema for the Comment model
const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" // This field references the User model
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post" // This field references the Post model
    },
    // Include the array of all comments in this comment schema itself
    likes: [
      {
        type : mongoose.Schema.Types.ObjectId ,
        ref: 'Like'
      }
    ]
}, {
    timestamps: true // This will automatically add `createdAt` and `updatedAt` fields
});

// Create the Comment model using the commentSchema
const Comment = mongoose.model('Comment', commentSchema);

// Export the Comment model to be used in other parts of the application
module.exports = Comment;
