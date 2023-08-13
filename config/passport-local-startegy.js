const passport = require('passport');

const LocalStartegy = require('passport-local').Strategy;
const User = require('../models/user');

// authentication using pasport
passport.use(new LocalStartegy({
        usernameFiled: 'email'
    }, function(email,password, done){
        // find a user and establich the identity
        User.findOne({email: email}, function(err, user){
            if(err){
                console.log('Error in finding user ---> Passport');
                return done(err);
            }
            if(!user || user.password != password){
                console.log("invalid password");
                return done(null, false);
            }
            return done(null, user);
        })
    }
));

