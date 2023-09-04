const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});

const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial-dev',
    smtp: {
        service: 'gmail', // The email service provider
        host: 'smtp.gmail.com', // The SMTP server host
        port: 587, // The port number for SMTP communication
        secure: false, // Use TLS for secure communication
        auth: {
            user: 'subhabiswal573@gmail.com', // Sender's email address
            pass: 'jkbxqvdydypxgaoz' // Sender's email password or app password
        }
    },
    google_client_id: '32813371257-q1lotdj0n55ka4j2snl32fm1dgkqibir.apps.googleusercontent.com',
    google_client_secret:  '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',
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}


const production =  {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail', // The email service provider
        host: 'smtp.gmail.com', // The SMTP server host
        port: 587, // The port number for SMTP communication
        secure: false, // Use TLS for secure communication
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME, // Sender's email address
            pass: process.env.CODEIAL_GMAIL_PASSWORD // Sender's email password or app password
        }
    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.CODEIAL_GOOGLE_CALL_BACK_URL ,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}


// module.exports = development
module.exports = production
// module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);