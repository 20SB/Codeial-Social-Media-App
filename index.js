const express = require('express');
const app = express();

const port = 8000;

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// use express router for home
app.use('/', require('./routes'));

// set ejs as view engine
app.set('view engine', 'ejs');

// tell where u have placed views
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
        return;
    }
    console.log(`Server is running on port : ${port}`);
})