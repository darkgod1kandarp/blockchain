## For running the multiple peer conection ##
### HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm start ###

## Peer Connection information ##
### Once you connected with peer like "const socket = new WebSocket(peer);" then the socket will open using "socket.on("open",()=>)" if you again try to open the socket then it will cause an error that websocket can not be open 

## Important note ##

### Once the "socket.on("message",()=>{})" the data will always there if any peer has sended that data ###
### ECC generates security between key pairs for public key encryption by using the mathematics of elliptic curves.###



