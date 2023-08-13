module.exports.profile = function(req,res){
    return res.render('user_profile', {
        title: "User profile"
    });
    // res.end('<h1>Hello, This is User Profile....</h1>');
}

module.exports.posts = function(req, res){
    res.end('<h1>Hello, This is User Posts....</h1>');
}

module.exports.timeline = function(req, res){
    res.end('<h1>Hello, This is User Timeline....</h1>');
}