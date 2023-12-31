const express = require('express');

const env = require('./config/environment');
const logger = require('morgan');


// console.log("path: ",eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT));
const cookieParser = require('cookie-parser');
const app = express();
require('./config/view-helpers')(app);
const port = 8000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Include layouts using its library
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// Require database configuration
const db = require('./config/mongoose');

// Set up session and authentication
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-startegy');

// import the configuration you've defined for the Google OAuth2 strategy using Passport
const passportGoogle = require('./config/passport-google-oauth2-startegy');

// Include the MongoStore for session storage
const MongoStore = require('connect-mongo');

const flash = require('connect-flash');
const customMware = require('./config/middleware');



// setup the chat server to be used with socket.io
const chatServer = require('http').createServer(app);
const chatSockets  = require('./config/chat_socket').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat Server is listening on 5000');

const path = require('path');

// Use middleware to parse URL-encoded data and cookies
app.use(express.urlencoded());
app.use(cookieParser());

// make the uploads path availabele to to the browser
app.use('/uploads',express.static(__dirname+ '/uploads'));

app.use(logger(env.morgan.mode, env.morgan.options));

// Serve static files from the 'assets' directory
app.use(express.static(env.asset_path));
console.log(env.asset_path);

// Extract styles and scripts from subpages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Specify the directory where views are located
app.set('views', './views');

// Set up session configuration
app.use(session({
    name: 'codeial',  // Name of the session cookie
    secret: env.session_cookie_key,  // Secret key used for session encryption
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)  // Max age of the session cookie (100 minutes)
    },
    store: MongoStore.create({
        mongoUrl: "mongodb://127.0.0.1/codeial-dev", // URL of the MongoDB instance
        autoRemove: 'disabled', // Disabling auto-removing expired sessions
    })
}));

// Initialize passport and use passport session middleware
app.use(passport.initialize());
app.use(passport.session());

// Custom middleware to set authenticated user
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// Use express router for routing
app.use('/', require('./routes'));

// Start the server on the specified port
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
        return;
    }
    console.log(`Server is running on port : ${port}`);
});

