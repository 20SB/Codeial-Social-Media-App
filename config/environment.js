

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
}


const production =  {
    name: 'production'
}



module.exports = development;