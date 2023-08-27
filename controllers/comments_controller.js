const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');

// Controller function to create a new comment
module.exports.create = async function(req, res) {
    try {
        // Find the post by its ID using Mongoose's findById method
        const post = await Post.findById(req.body.post);

        if (post) {
            // Create a new comment using the Comment model
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            // Push the created comment's reference to the post's comments array
            post.comments.push(comment);

            // Save the post to update its comments array
            await post.save();

            // populate the user specillay name and email of user
            comment = await comment.populate('user', 'name email');

            // send email notification about new comment using commentsMailer module's newComment func
            commentsMailer.newComment(comment);

            req.flash('success', 'Comment published!');

            // Redirect back to the home page after successfully creating the comment
            return res.redirect('/');
        }
    } catch (err) {

        req.flash('error', err);
        console.log("error in creating comment:", err);
        // Handle the error in an appropriate way, such as rendering an error page
        
    }
};

// Controller function to delete a comment
module.exports.destroy = async function(req, res) {
    try {
        // Find the comment by its ID using Mongoose's findById method
        const comment = await Comment.findById(req.params.id);

        // Check if the comment exists
        if (!comment) {
            return res.redirect('back');
        }

        // Find the post to which the comment belongs
        const post = await Post.findById(comment.post);

        // Check if the user deleting the comment is the (owner of the post or owner of the comment)
        if (post.user.toString() === req.user.id || comment.user.toString() === req.user.id) {
            // Delete the comment using the deleteOne method
            await comment.deleteOne();

            // Remove the comment's reference from the post's comments array
            await Post.findByIdAndUpdate(
                comment.post,
                { $pull: { comments: req.params.id } }
            );

            req.flash('success', 'Comment deleted!');

            // Redirect back to the previous page after successfully deleting the comment
            return res.redirect('back');
        } else {
            req.flash('error', 'Unauthorized');
            // If the user is not the owner of the post and not the author of the comment, redirect back
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error', err);
        // If an error occurs during the deletion process, log the error
        console.log("Error in deleting comment:", err);
        // Return a 500 Internal Server Error response
        return res.status(500).send('Internal Server Error');
    }
};

