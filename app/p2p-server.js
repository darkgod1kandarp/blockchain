const WebSocket = require("ws");

//port number for the server
const P2P_PORT = process.env.P2P_PORT || 5001;

//peer id added
const peers = process.env.PEERS ? process.env.PEERS.split(",") : [];
console.log(peers, "first");

class P2pserver {
  //constructor of the peer to peer server
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.sockets = [];
  }

  //create the server of socket
  listen() {
    const server = new WebSocket.Server({ port: P2P_PORT });
    server.on("connection", (socket) => this.connectSocket(socket));
    this.connectToPeers();
    console.log(`Listening for peer to peer connections on ${P2P_PORT}`);
  }

  //connecting the peers if socket is connected
  connectToPeers() {
    peers.forEach((peer) => {
      const socket = new WebSocket(peer);
      socket.on("open", () => this.connectSocket(socket));
    });
  }

  //adding the socket to the array
  connectSocket(socket) {
    this.sockets.push(socket);
    console.log("Socket connected");

    //socket started for listening
    this.messageHandler(socket);

    //socket started sending the chain
    this.sendChain(socket);
  }

  //every time the message sent by any peer will collect data here
  messageHandler(socket) {

    //message function here that will recieve the message from here 
    socket.on("message", (message) => {
        
        const data = JSON.parse(message);
        this.blockchain.replaceChain(data);
      
    });
  }

  //sending fuction
  sendChain(socket) {
    socket.send(JSON.stringify(this.blockchain.chain));
  }

  syncChain() {
    //sending the chain to each peer
    
    this.sockets.forEach((socket) => {
      //send function
      this.sendChain(socket);
    });
  }
}

module.exports = P2pserver;
