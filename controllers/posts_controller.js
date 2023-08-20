// Import the Post and Comment models
const Post = require("../models/post");
const Comment = require("../models/comment");
const { json } = require("express");

// Controller function to create a new post
module.exports.create = async function(req, res){
    try{
        // Create a new post using content from the request body and user ID from request object.
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        
        // Check if the request is an AJAX request.
        if (req.xhr){
            // If AJAX, send JSON response with new post and success message.
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }

        // Store success flash message and redirect back to previous page.
        req.flash('success', 'Post published!');
        return res.redirect('back');

    }catch(err){
        // Store error flash message and redirect back to previous page.
        req.flash('error', err);
        return res.redirect('back');
    }
}


// Controller function to delete a post
module.exports.destroy = async function (req, res) {
    try {
        // Find the post by its ID using Mongoose's findById method
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.redirect("back");
        }

        if (post.user.toString() === req.user.id) {
            // Delete the post using the deleteOne method
            await post.deleteOne();

            // Delete all comments associated with the post
            await Comment.deleteMany({ post: req.params.id });

            req.flash("success", "Post and associated comments deleted!");

            // Redirect back to the previous page after successfully deleting the post and its comments
            return res.redirect("back");
        } else {
            req.flash("error", "You cannot delete this post!");
            // If the user is not the owner of the post, redirect back
            return res.redirect("back");
        }
    } catch (err) {
        req.flash("error", err);
        console.error(err);
        // Return a 500 Internal Server Error response
        return res.status(500).send("Internal Server Error");
    }
};
