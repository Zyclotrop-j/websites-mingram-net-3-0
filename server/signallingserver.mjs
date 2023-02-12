import socketioServer from 'fastify-socket.io'

export default function startSignalingServer(app) {
    app.register(socketioServer, {
        cors: {
          origin: '*',
          methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        },
      });

    const socketData = new Map();
    app.ready((err) => {
        if (err) throw err;

        app.io.on('connection', function (socket) {
            //const id = socket.id;
            socketData.set(socket, []);

            socket.on('signal', (message) => {
                [...socketData.values()].flat().filter(({ peerId }) => peerId === message.to).forEach(({ socket }) => socket.emit('signal', message));
            });
            socket.on('join', (message) => {
                const allInRoom = [...socketData.values()].flat().filter(({ room }) => room === message.room);
                const allPeerIdsInRoom = [message.peerId, ...allInRoom.map(({ peerId }) => peerId)];
                if(allPeerIdsInRoom.length > (256/4-1)) { // 256 connections max per browser, 4 collections ('assets', 'styles','pages', 'components')
                    return socket.disconnect();
                }
                socketData.get(socket).push({
                    socketId: socket.id,
                    room: message.room,
                    peerId: message.peerId,
                    socket,
                    joined: new Date(),
                });
                [{socket}, ...allInRoom].forEach(({ socket }) => socket.emit('joined', allPeerIdsInRoom));
                console.log(`${message.room} now has ${allPeerIdsInRoom.length} members`)
            });
            socket.on("disconnect", (reason) => {
                socketData.delete(socket);
            });
        });
    });
    return socketData;
}