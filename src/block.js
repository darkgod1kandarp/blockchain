const SHA256 = require("crypto-js/sha256");

//Difficulty level before mining the block you hvae to match the hash difficulty level
const { DIFFICULTY, MINE_RATE } = require("../configure");


class Block {
  constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty ;
  }

  toString() {
    return `Block -
        Timestamp : ${this.timestamp},
        Last Hash : ${this.lastHash.substring(0, 10)},
        Hash      : ${this.hash.substring(0, 10)},
        Data      : ${this.data},
        Nonce     : ${this.nonce},
        DIFFICULTY:${this.difficulty}

        `;
  }

  //genesis blocak will be the first block in the chain
  //we will be able to call the file directly
  static genesis() {
    //will call same class
    return new this(
      154000,
      "----",
      "f1r57-h45h",
      "Genesis data",
      0,
      DIFFICULTY
    );
  }

  //after genesis block other all block are added
  //nonce is just number that says how many iteration it takes to gnerate the hash to match difficulty level
  static mineBlock(lastBlock, data) {
    let hash, timestamp;
    const lastHash = lastBlock.hash;
    let nonce = 0;
    let difficulty = 0;
    do {
      nonce++;
      timestamp = Date.now();
     
      difficulty = Block.adjustDifficulty(lastBlock, timestamp);
      
      hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);
      
    } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));
  
     
    return new this(timestamp, lastHash, hash, data, nonce,difficulty);

  }

  // hashing the block
  static hash(timestamp, lastHash, data, nonce, difficulty) {
    return SHA256(
      `${timestamp}${lastHash}${data}${nonce}${difficulty}`
    ).toString();
  }
  

  //adjusting difficulty level using the rate of the mining of the block
  static adjustDifficulty(lastBlock, currentTime) {
    let{difficulty} = lastBlock;
    
    difficulty =
      lastBlock.timestamp + MINE_RATE > currentTime
        ? difficulty + 1
        : difficulty - 1;
    
    return difficulty;
  }
  

  //hashing the block
  static blockHash(block) {
    const { timestamp, lastHash, data, nonce,difficulty } = block;
    return Block.hash(timestamp, lastHash, data,nonce,difficulty);
  }
}

module.exports = Block;
