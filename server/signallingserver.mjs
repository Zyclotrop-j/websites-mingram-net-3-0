import socketioServer from 'fastify-socket.io'

const isAllowedToJoinRoom = room => {
    // todo
    return true;
}

export default function startSignalingServer(app) {
    app.register(socketioServer, {
        cors: {
          origin: '*',
          methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        },
      });

    app.ready((err) => {
        if (err) throw err;

        app.io.on('connection', function (socket) {
            //const id = socket.id;
            //socketData.set(socket, []);

            socket.on('signal', (message) => {
                const myRooms = app.io.of("/").adapter.sids.get(socket.id);
                const theirRooms = app.io.of("/").adapter.sids.get(message.to);
                if([...myRooms.values()].some(myRoom => theirRooms.has(myRoom))) {
                    // only broadcast if we are in the same rooms
                    socket.broadcast.to(message.to).emit('signal', message);
                } else {
                    console.warn(`No overlapping rooms between ${socket.id} and ${message.to}`, myRooms, theirRooms)
                }
                // [...socketData.values()].flat().filter(({ peerId }) => peerId === message.to).forEach(({ socket }) => socket.emit('signal', message));
            });
            socket.on('join', (message) => {
                if(!isAllowedToJoinRoom(message.room)) {
                    return socket.disconnect();
                }

                socket.join(message.room);

                const allInRoom = app.io.of("/").adapter.rooms.get(message.room);
                //console.log("allInRoom", allInRoom, app.io.of("/").adapter.rooms);
                // [...socketData.values()].flat().filter(({ room }) => room === message.room);

                if(allInRoom.size > (256/4-1)) { // 256 webRTC connections max per browser, 4 collections ('assets', 'styles','pages', 'components')
                    return socket.disconnect();
                }

                
                /*socketData.get(socket).push({
                    socketId: socket.id,
                    room: message.room,
                    peerId: message.peerId,
                    socket,
                    joined: new Date(),
                });*/
                app.io.to(message.room).emit('joined', { room: [...allInRoom], self: socket.id });

                //[{socket}, ...allInRoom].forEach(({ socket }) => socket.emit('joined', allPeerIdsInRoom));
                //console.log(`${message.room} now has ${allInRoom.size} members`)
            });
            socket.on("disconnect", (reason) => {
                // room is automatically cleaned up
                //socketData.delete(socket);
            });
        });
    });
    return app.io;
}