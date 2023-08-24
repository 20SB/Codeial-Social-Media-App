// Import the User model
const User = require('../models/user');
const fs = require('fs');
const path = require('path');

// Controller function to render user profile page
module.exports.profile = async function(req, res) {
    try {
        // Fetch user data by their ID from the request parameters and wait for the promise to resolve
        const user = await User.findById(req.params.id).exec();

        // Render the 'user_profile' view with the fetched user data
        return res.render('user_profile', {
            title: "User profile",
            profile_user: user
        });
    } catch (err) {
        // If an error occurs during the user data fetching or rendering, log the error
        console.log("Error in fetching user:", err);
        // Handle the error in an appropriate way, such as rendering an error page
    }
}

// Controller function to update user profile
module.exports.update = async function(req, res) {
    // Check if the authenticated user's ID matches the requested user's ID
    if (req.user.id == req.params.id) {
        try {
            // Find the user by the provided ID
            let user = await User.findById(req.params.id);
            
            // Use Multer middleware to handle file uploads (avatars in this case)
            User.uploadedAvatar(req, res, function(err) {
                if (err) {
                    console.log('***** MULTER Error: ', err);
                }
                // Update user properties from request body
                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file) {

                    // if avatar is already present delete the avatar
                    if(user.avatar){
                        try {
                            fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                        } catch (unlinkErr) {
                            console.log('Error deleting existing avatar:', unlinkErr);
                        }
                    }
                    // Save the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                
                // Flash a success message
                req.flash('success', 'Updated!');
                
                // Save the user changes to the database
                user.save();
                
                // Redirect the user back to the previous page
                return res.redirect('back');
            });

        } catch(err) {
            // Handle errors if any occur during the process
            req.flash('error', err);
            console.log("Error in updating user:", err);
        }

    } else {
        // If the authenticated user's ID doesn't match the requested user's ID
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
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
        req.flash('error', 'Passwords do not match');
        return res.redirect('back'); // Redirect back if passwords don't match
    }

    try {
        // Check if a user with the provided email already exists
        const existingUser = await User.findOne({ email: req.body.email });

        if (!existingUser) {
            // If user doesn't exist, create a new user
            const newUser = await User.create(req.body);
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('/users/sign-in'); // Redirect to sign-in page after successful user creation
        } else {

            req.flash('error', "Another account is present on this Email");
            return res.redirect('back'); // Redirect back if user with the provided email already exists
        }
    } catch (error) {
        req.flash('error', err);
        console.log('Error:', error);
        return res.status(500).send('Internal Server Error'); // Handle the error gracefully with a 500 status
    }
}

// Controller function to handle user session creation (sign in)
module.exports.createSession = function(req, res){
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

// Controller function to handle user session destruction (sign out)
module.exports.destroySession = function(req, res){
    req.logout(function(err) {
        if (err) {
            console.log("Error while logging out:", err);
        }
        req.flash('success','You have Logged out!');
        return res.redirect('/');
    });
}
