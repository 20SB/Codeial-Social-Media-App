// Import the nodemailer configuration
const nodeMailer = require('../config/nodemailer');

// Exported function to send a new comment email notification
exports.newComment = (comment) => {
    console.log('Inside new comment mailer', comment);

    // Use the transporter to send an email
    nodeMailer.transporter.sendMail({
        from: 'Codeial', // Sender's name or email
        to: comment.user.email, // Recipient's email
        subject: 'New Comment Published!', // Email subject
        html: '<h1> Yup, Your Comment Published </h1>' // Email content in HTML format
    }, (err, info) => {
        if (err) {
            console.log('Error in sending mail', err);
            return;
        }
        console.log('Message sent', info);
        return;
    });
}
