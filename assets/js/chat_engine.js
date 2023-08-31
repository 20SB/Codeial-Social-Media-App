class ChatEngine {

    // Constructor function for initializing the class instance
    constructor(chatBoxId, userEmail) {
        // Assign the DOM element with the provided ID to the 'chatBox' property
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        // Establish a socket connection to the specified server address
        this.socket = io.connect('http://localhost:5000');

        // Check if a user's email is provided
        if (this.userEmail) {
            // then Call the 'connectionHandler' method to handle socket connection
            this.connectionHandler();
        }
    }

    // Method for handling the socket connection
    connectionHandler() {
        // Store the current instance of the class in the variable 'self'
        let self = this;

        // Set up an event listener for the 'connect' event on the socket
        this.socket.on('connect', function() {
            // Output a message to the console when the socket connection is established
            console.log("Connection established using sockets....!");
        });

        // Emit a 'join_room' event with user information to the server
        self.socket.emit('join_room', {
            user_email: self.userEmail,
            chatroom: 'codeial'
        });

        // Set up an event listener for the 'user_joined' event on the socket
        self.socket.on('user_joined', function(data) {
            // Output a message to the console when a user joins the room
            console.log('a user joined!', data);
        });

        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();

            if (msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                });
            }
        });

        self.socket.on('receive_message', function(data){
            console.log('message received', data.message);


            let newMessage = $('<li>');

            let messageType = 'other-message';

            if (data.user_email == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($('<span>', {
                'html': data.message
            }));

            newMessage.append($('<sub>', {
                'html': data.user_email
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        })
    }
}
