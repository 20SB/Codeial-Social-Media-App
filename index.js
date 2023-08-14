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

const MongoStore = require('connect-mongo')(session);

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

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'interval', // Use 'interval' instead of 'disabled'
        autoRemoveInterval: 60 * 24 // This is in minutes (removes expired sessions daily)
    }, function (err){
        console.log(err || 'connect-mongodb setup ok');
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router for home
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
        return;
    }
    console.log(`Server is running on port : ${port}`);
})