const Block = require("./block");
class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock(data) {
    const block = Block.mineBlock(this.chain[this.chain.length - 1], data);
    this.chain.push(block);
    return block;
  }

  isChainValidate(chain){

    //You can not directly compare two dictionary in javascript it will 
    //always show false so use JSON.stringify() that convert collection to the string
      if (JSON.stringify(chain[0])!==JSON.stringify(Block.genesis())) return false;

      //checking the hash value and its genertaed hash value from teh block
      var i;
      for ( i = 1; i < chain.length;i++) {
          const block = chain[i];
            const lastBlock = chain[i - 1];
            if(block.lastHash!==lastBlock.hash || block.hash!==Block.blockHash(block)){
                return false;
            }

          
      }
      return true;
  }
}

module.exports = Blockchain;
