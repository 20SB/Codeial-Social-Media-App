// Import the User model
const User = require('../models/user');

// Controller function to render user profile page
module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: "User profile",
    });
}

// Controller function to render sign-up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "User Sign Up"
    });
}

// Controller function to render sign-in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "User Sign In"
    });
}

// Controller function to create a new user
module.exports.create = async function(req, res) {
    // Check if password and confirm_password match
    if (req.body.password !== req.body.confirm_password) {
        return res.redirect('back'); // Redirect back if passwords don't match
    }

    try {
        // Check if a user with the provided email already exists
        const existingUser = await User.findOne({ email: req.body.email });

        if (!existingUser) {
            // If user doesn't exist, create a new user
            const newUser = await User.create(req.body);
            return res.redirect('/users/sign-in'); // Redirect to sign-in page after successful user creation
        } else {
            return res.redirect('back'); // Redirect back if user with the provided email already exists
        }
    } catch (error) {
        console.log('Error:', error);
        return res.status(500).send('Internal Server Error'); // Handle the error gracefully with a 500 status
    }
}

// Controller function to handle user session creation (sign in)
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

// Controller function to handle user session destruction (sign out)
module.exports.destroySession = function(req, res){
    req.logout(function(err) {
        if (err) {
            console.log("Error while logging out:", err);
        }
        return res.redirect('/');
    });
}
