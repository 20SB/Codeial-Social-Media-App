const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req, res){

    // Fetch all posts along with their associated user and comments
    let posts = await Post.find({})
    .sort("-createdAt")
    .populate("user") // Populate the user field for each post
    .populate({
        // Populate the comments field for each post, and for each comment, populate the user field
        path: "comments",
        populate: {
            path: "user",
        },
    })
    .exec(); // Use .exec() to execute the query and return a promise

    return res.json(200, {
        message: "List of Posts",
        posts: posts
    })
}

// Controller function to delete a post
module.exports.destroy = async function (req, res) {
    try {
        // Find the post by its ID using Mongoose's findById method
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.json(500,{
                message: "Post Not Found"
            });
        }

        // if (post.user.toString() === req.user.id) {

            // Delete the post using the deleteOne method
            await post.deleteOne();

            // Delete all comments associated with the post
            await Comment.deleteMany({ post: req.params.id });

            return res.json(200,{
                message: "Post and associated comments are deleted successfully! "
            });

        // } else {
        //     req.flash("error", "You cannot delete this post!");
        //     // If the user is not the owner of the post, redirect back
        //     return res.redirect("back");
        // }
    } catch (err) {

        return res.json(500,{
            message: "Internal Server Error"
        });
    }
};