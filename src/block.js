const SHA256 = require("crypto-js/sha256");
class Block {
  constructor(timestamp, lastHash, hash, data) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }

  toString() {
    return `Block -
        Timestamp : ${this.timestamp},
        Last Hash : ${this.lastHash.substring(0, 10)},
        Hash      : ${this.hash.substring(0, 10)},
        Data      : ${this.data}
        `;
  }

  //genesis blocak will be the first block in the chain
  //we will be able to call the file directly
  static genesis() {
    //will call same class
    return new this("Genesis time", "----", "f1r57-h45h", "Genesis data");
  }

  //after genesis block other all block are added
  static mineBlock(lastBlock, data) {
    const lastHash = lastBlock.hash;
    const timestamp = Date.now();

    const hash = Block.hash(timestamp, lastHash, data);
    return new this(timestamp, lastHash, hash, data);
  }

  // hashing the block
  static hash(timestamp, lastHash, data) {
    return SHA256(`${timestamp}${lastHash}${data}`).toString();
  }

  static blockHash(block) {
    const {timestamp,lastHash,data} = block;
    return Block.hash(timestamp,lastHash,data);
  }
}

module.exports = Block;
