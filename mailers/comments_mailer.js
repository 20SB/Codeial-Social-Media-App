// Import the nodemailer configuration
const nodeMailer = require('../config/nodemailer');

// Exported function to send a new comment email notification
exports.newComment = (comment) => {
    // Render the email content using the provided comment data and template
    let htmlString = nodeMailer.renderTemplate({ comment: comment }, '/comments/new_comment.ejs');

    // Use the transporter to send an email
    nodeMailer.transporter.sendMail({
        from: 'Codeial', // Sender's name or email
        to: comment.user.email, // Recipient's email
        subject: 'New Comment Published!', // Email subject
        html: htmlString // Rendered email content from the template
    }, (err, info) => {
        if (err) {
            console.log('Error in sending mail', err);
            return;
        }
        console.log('Message sent', info);
        return;
    });
}
