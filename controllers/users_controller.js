const User = require("../models/user");

module.exports.profile = async function(req, res) {
    try {
      if (req.cookies.user_id) {
        // Use findById to retrieve the user asynchronously
        const user = await User.findById(req.cookies.user_id);
  
        if (user) {
          // Render user profile page if user is found
          return res.render("user_profile", {
            title: "User profile",
            user: user
          });
        }
        // Redirect to sign-in page if user is not found
        return res.redirect('/users/sign-in');
      } else {
        // Redirect to sign-in page if user_id cookie doesn't exist
        return res.redirect('/users/sign-in');
      }
    } catch (error) {
      console.log('Error:', error);
      return res.status(500).send('Internal Server Error'); // Handle the error gracefully with a 500 status
    }
  };
  
    // The following code is commented out
    // This could be removed since it's not being used
    // return res.render('user_profile', {
    //     title: "User profile"
    // });
    // res.end('<h1>Hello, This is User Profile....</h1>');

  

module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "User Sign Up",
  });
};

module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "User Sign In",
  });
};

// get the sign Up data
module.exports.create = async function (req, res) {
  // Check if password and confirm_password match
  if (req.body.password !== req.body.confirm_password) {
    return res.redirect("back"); // Redirect back if passwords don't match
  }

  try {
    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({ email: req.body.email });

    if (!existingUser) {
      // If user doesn't exist, create a new user
      const newUser = await User.create(req.body);
      return res.redirect("/users/sign-in"); // Redirect to sign-in page after successful user creation
    } else {
      return res.redirect("back"); // Redirect back if user with the provided email already exists
    }
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).send("Internal Server Error"); // Handle the error gracefully with a 500 status
  }
};

// get the sign In data
module.exports.createSession = async function (req, res) {
  try {
    // Find the user based on the provided email
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      // Handle incorrect password
      if (user.password !== req.body.password) {
        return res.redirect("back"); // Redirect back if password doesn't match
      }

      // Create a session by setting a user_id cookie
      res.cookie("user_id", user.id);
      return res.redirect("/users/profile"); // Redirect to the user's profile page
    } else {
      return res.redirect("back"); // Redirect back if user not found
    }
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).send("Internal Server Error"); // Handle the error gracefully with a 500 status
  }
};
