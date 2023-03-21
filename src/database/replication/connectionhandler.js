import { Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import Peer from 'simple-peer';
import { io } from 'socket.io-client';

const cachedSocket = {};

/**
 * Returns a connection handler that uses simple-peer and the signaling server.
 */
export function getConnectionHandlerSimplePeer(
    serverUrl,
    wrtc
) {
    const creator = (options) => {  
        let deref = cachedSocket[serverUrl]?.deref?.();
        if(!deref) {
            deref = io(serverUrl);
            cachedSocket[serverUrl] = new WeakRef(deref)
        }
        const socket = deref;      

        const connect$ = new Subject();
        const disconnect$ = new Subject();
        const message$ = new Subject();
        const response$ = new Subject();
        const error$ = new Subject();

        socket.on("connect", () => {
            
            const peerId = socket.id;
            socket.emit('join', {
                room: options.topic,
                peerId
            });
    
            const peers = new Map();
    
            socket.on('joined', ({room: roomPeerIds, self }) => {
                roomPeerIds.forEach(remotePeerId => {
                    if (
                        remotePeerId === peerId ||
                        peers.has(remotePeerId)
                    ) {
                        return;
                    }
                    //console.log('other user joined room ' + remotePeerId, peerId, self, remotePeerId > peerId);
                    const newPeer = new Peer({
                        initiator: remotePeerId > peerId,
                        wrtc,
                        trickle: true
                    });
                    peers.set(remotePeerId, newPeer);
    
                    newPeer.on('data', (messageOrResponse) => {
                        messageOrResponse = JSON.parse(messageOrResponse.toString());
                        // console.log('got a message from peer3: ' + messageOrResponse)
                        if (messageOrResponse.result) {
                            response$.next({
                                peer: newPeer,
                                response: messageOrResponse
                            });
                        } else {
                            message$.next({
                                peer: newPeer,
                                message: messageOrResponse
                            });
                        }
                    });
    
                    newPeer.on('signal', (signal) => {
                        //console.log('emit signal from ' + peerId + ' to ' + remotePeerId);
                        socket.emit('signal', {
                            from: peerId,
                            to: remotePeerId,
                            room: options.topic,
                            signal
                        });
                    });
    
                    newPeer.on('error', (error) => {
                        error$.next(new Error('RC_P2P_PEER', {
                            error
                        }));
                    });
    
                    newPeer.on('connect', () => {
                        //console.log('Connect', newPeer)
                        connect$.next(newPeer);
                    });
    
                });
            });
    
            socket.on('signal', (data) => {
                // console.log('got signal(' + peerId + ') ' + data.from + ' -> ' + data.to);
                const peer = peers.get(data.from);
                if(!peer) throw new Error(`Peer ${data.from} not found!`)
                peer.signal(data.signal);
            });

        });

        

        const handler = {
            error$,
            connect$,
            disconnect$,
            message$,
            response$,
            async send(peer, message) {
                await (peer).send(JSON.stringify(message));
            },
            destroy() {
                socket.close();
                error$.complete();
                connect$.complete();
                disconnect$.complete();
                message$.complete();
                response$.complete();
                return Promise.resolve();
            }
        };
        return handler;
    };
    return creator;
}