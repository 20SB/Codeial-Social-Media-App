// Import the mongoose library
const mongoose = require("mongoose");

// Define the schema for the Post model
const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" // This field references the User model
  },
  // Include the array of all comments in this post schema itself
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment' // This field references the Comment model
  }]
}, {
    timestamps: true // This will automatically add `createdAt` and `updatedAt` fields
});

// Create the Post model using the postSchema
const Post = mongoose.model('Post', postSchema);

// Export the Post model to be used in other parts of the application
module.exports = Post;
