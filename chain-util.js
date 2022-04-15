//this are the in built library that are built  for encoding decoding private and public key
const EC = require('elliptic').ec;
//Using secp256k1 method has been used
const ec = new EC('secp256k1');

class ChainUtil{

    //function that return gen function
    static genKeyPair(){

        //return method that generate private key and public key and signature also
        return ec.genKeyPair();
    }
}
module.exports = ChainUtil;