// Import the Post and Comment models
const Post = require('../models/post');
const Comment = require('../models/comment');

// Controller function to create a new post
module.exports.create = function(req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    })
    .then(post => {
        // Redirect back to the previous page after successfully creating the post
        return res.redirect('back');
    })
    .catch(err => {
        console.log('Error in creating post:', err);
        // Handle the error in an appropriate way
    });
}

// Controller function to delete a post
module.exports.destroy = async function(req, res) {
    try {
        // Find the post by its ID using Mongoose's findById method
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.redirect('back');
        }

        if (post.user.toString() === req.user.id) {
            // Delete the post using the deleteOne method
            await post.deleteOne();

            // Delete all comments associated with the post
            await Comment.deleteMany({ post: req.params.id });

            // Redirect back to the previous page after successfully deleting the post and its comments
            return res.redirect('back');
        } else {
            // If the user is not the owner of the post, redirect back
            return res.redirect('back');
        }
    } catch (err) {
        console.error(err);
        // Return a 500 Internal Server Error response
        return res.status(500).send('Internal Server Error');
    }
};
