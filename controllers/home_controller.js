const Post = require("../models/post");

module.exports.home = function (req, res) {
  // Post.find({})
  // .then(posts => {
  //     return res.render('home', {
  //         title: "Codeial | Home",
  //         posts: posts
  //     });
  // })
  // .catch(err => {
  //     console.log('error in fetching posts:', err);
  //     // Handle the error in an appropriate way
  // });

  //   populate the user for each post
  Post.find({})
    .populate("user")
    .populate({
      path: 'comments',
      populate: {
        path: 'user'
      }
    })
    .then((posts) => {
      return res.render("home", {
        title: "Codeial | Home",
        posts: posts,
      });
    })
    .catch((err) => {
      console.log("error in fetching posts:", err);
      // Handle the error in an appropriate way
    });
};
