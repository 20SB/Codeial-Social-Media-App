// Import the Post model
const Post = require("../models/post");
const User = require("../models/user");

// Controller function for rendering the home page
module.exports.home = async function (req, res) {
    try {
        // Fetch all posts along with their associated user and comments
        const posts = await Post.find({})
            .sort("-createdAt")
            .populate("user") // Populate the user field for each post
            .populate({
                // Populate the comments field for each post, and for each comment, populate the user field
                path: "comments",
                populate: {
                    path: "user",
                },
                populate: {
                    path: "likes",
                }
            }).populate('comments')
            .populate('likes');
    

        // Fetch all users
        const users = await User.find({}).exec();

        // Render the home page and pass the fetched posts and users to the view
        return res.render("home", {
            title: "Codeial | Home",
            posts: posts,
            all_users: users,
        });
    } catch (err) {
        console.log("Error in fetching posts:", err);
        // Handle the error in an appropriate way, such as rendering an error page
    }
};
