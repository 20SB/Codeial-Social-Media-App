const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike = async function(req, res) {
    try {
        // likes/toggle/?id=abcdef&type=Post
        // Initialize variables to keep track of the object and like deletion status
        let likeable;
        let deleted = false;

        // Check if the likeable type is 'Post' or 'Comment' based on the query parameter
        if (req.query.type == 'Post') {
            // Fetch the Post object with associated likes
            likeable = await Post.findById(req.query.id).populate('likes');
        } else {
            // Fetch the Comment object with associated likes
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        // Check if the user has already liked this object
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        });

        // If the like already exists, remove it
        if (existingLike) {
            likeable.likes.pull(existingLike._id); // Remove like from likes array of likeable object
            likeable.save(); // Save the updated likeable object

            existingLike.deleteOne(); // Delete the existing like document
            deleted = true; // Set deleted to true
        } else {
            // If like doesn't exist, create a new like
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });

            likeable.likes.push(newLike._id); // Add the new like to likes array of likeable object
            likeable.save(); // Save the updated likeable object
        }

        // Send a response with the result, indicating if a like was deleted
        return res.json(200, {
            data: {
                deleted: deleted
            }
        });

    } catch (err) {
        console.log(err);
        // If an error occurs, send an internal server error response
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
};
