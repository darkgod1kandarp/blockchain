const { INITIAL_BALANCE } = require("../configure");
const ChainUtil =  require('../chain-util')
class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPair = ChainUtil.genKeyPair();
    //getting public key fro gen class and then encoding it in hex
    this.PublicKey = this.keyPair.getPublic().encode('hex');
  }
  toString(){
      return `Wallet --
            PublicKey :${this.PublicKey.toString()},
            balance: ${this.balance}
      `
  }
}
module.exports = Wallet;
