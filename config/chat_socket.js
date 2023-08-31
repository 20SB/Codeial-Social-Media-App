// Exporting a function named 'chatSockets' from index.js
module.exports.chatSockets = function(socketServer) {
    // Require the 'socket.io' library and initialize it with the provided 'socketServer'
    let io = require('socket.io')(socketServer, {
        cors: {
            origin: '*',
        }
    });

    // Set up an event listener for incoming socket connections
    io.sockets.on('connection', function(socket) {
        console.log('new connection received', socket.id);

        // Set up an event listener for the 'disconnect' event on the socket
        socket.on('disconnect', function() {
            console.log('socket disconnected!');
        });

        // Set up an event listener for the 'join_room' event on the socket
        socket.on('join_room', function(data) {
            console.log('joining request received: ', data);

            // Have the socket join a specific room based on the received 'chatroom' data
            socket.join(data.chatroom);

            // Emit a 'user_joined' event to all sockets in the specified chatroom
            io.in(data.chatroom).emit('user_joined', data);
        });

        socket.on('send_message', function(data){
            io.in(data.chatroom).emit('receive_message', data);
        });
    });
};
