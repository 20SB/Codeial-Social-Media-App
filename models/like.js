// Import the Mongoose library
const mongoose = require('mongoose');

// Define the schema for handling "likes"
const likeSchema = new mongoose.Schema({
    // User who performed the like
    user: {
        type: mongoose.Schema.ObjectId
    },
    // Object being liked (post or comment)
    // this defines the object Id of the liked object
    likeable: {
        type: mongoose.Schema.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    // Type of content being liked (post or comment), this is a dynamic ref.
    onModel: {
        type: String,
        require: true,
        enum: ['Post', 'Comment']
    }
}, {
    // Automatically add timestamps to the documents
    timestamps: true
});

// Create the "Like" model using the defined schema
const Like = mongoose.model('Like', likeSchema);

// Export the "Like" model to use in other parts of the application
module.exports = Like;
