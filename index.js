const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

// include layouts uisng its library
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

const db = require('./config/mongoose');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.urlencoded());
app.use(cookieParser());

// inclue static files
app.use(express.static('./assets'));

// extract style and scripts from subpages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set ejs as view engine
app.set('view engine', 'ejs');

// tell where u have placed views
app.set('views', './views');

app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());


// use express router for home
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
        return;
    }
    console.log(`Server is running on port : ${port}`);
})