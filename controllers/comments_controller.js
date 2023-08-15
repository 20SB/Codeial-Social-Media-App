const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res) {
    try {
        // Find the post by its ID using Mongoose's findById method
        const post = await Post.findById(req.body.post);

        if (post) {
            // Create a new comment using the Comment model
            const comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            // Push the created comment's reference to the post's comments array
            post.comments.push(comment);

            // Save the post to update its comments array
            await post.save();

            // Redirect back to the home page after successfully creating the comment
            return res.redirect('/');
        }
    } catch (err) {
        console.log("error in creating comment:", err);
        // Handle the error in an appropriate way, such as rendering an error page
    }
}

