// Import the Post model
const Post = require("../models/post");

// Controller function for rendering the home page
module.exports.home = function (req, res) {
  // Fetch all posts along with their associated user and comments
  Post.find({})
    .populate("user") // Populate the user field for each post
    .populate({       // Populate the comments field for each post, and for each comment, populate the user field
      path: 'comments',
      populate: {
        path: 'user'
      }
    })
    .then((posts) => {
      // Render the home page and pass the fetched posts to the view
      return res.render("home", {
        title: "Codeial | Home",
        posts: posts,
      });
    })
    .catch((err) => {
      console.log("Error in fetching posts:", err);
      // Handle the error in an appropriate way, such as rendering an error page
    });
};
