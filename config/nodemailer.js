// Import the 'nodemailer' library for sending emails
const nodemailer = require('nodemailer');

const env = require('./environment');

// Import the 'ejs' library for rendering HTML templates
const ejs = require('ejs');

// Import the 'path' module for handling file paths
const path = require('path');

// Create a nodemailer transporter configuration object
let transporter = nodemailer.createTransport(env.smtp);

// Define a function to render an email template
let renderTemplate = (data, relativePath) => {
    let mailHTML;

    // Render the ejs template using the provided data
    ejs.renderFile(
        path.join('__dirname', '../views/mailers', relativePath), // Path to the template
        data, // Data to be injected into the template
        function(err, template) {
            if (err) {
                console.log('error in rendering template', err);
                return;
            }
            mailHTML = template;
        }
    );

    return mailHTML; // Return the rendered template as HTML
};

// Export the transporter configuration and renderTemplate function
module.exports = {
    transporter: transporter, // Export the transporter configuration
    renderTemplate: renderTemplate // Export the renderTemplate function
};
