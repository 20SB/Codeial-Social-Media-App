//require the library
const mongoose = require('mongoose');

const env = require('./environment');

//connect to the database
// mongoose.connect(`mongodb://127.0.0.1/${env.db}`);
const DB = `mongodb+srv://subhabiswal100:QAMqOf8ja2GW9oBL@cluster0.piyhowh.mongodb.net/${env.db}`;

mongoose.connect(DB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

//acquire the connection(to check if it's successful)
const db = mongoose.connection;

//error
db.on('error', function(err) { console.log(err.message); });

//up and running then print the message
db.once('open', function() {
  
    console.log("Successfully connected to the database :: MongoDB");

});

module.exports = db;