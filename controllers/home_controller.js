module.exports.home = function(req,res){
    return res.render('home', {
        title: "Home"
    });
    // return res.end('<h1>Hello, This is Home Page...</h1>');
}