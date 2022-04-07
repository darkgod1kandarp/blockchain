class Block {
    constructor(timestamp,lastHash,hash,data){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
      
    }

    
    toString(){
      return (`Block -
        Timestamp : ${this.timestamp},
        Last Hash : ${this.lastHash.substring(0,10)},
        Hash      : ${this.hash.substring(0,10)},
        Data      : ${this.data}
        `);
    }
    
    //genesis blocak will be the first block in the chain
    //we will be able to call the file directly 
    static genesis(){

        //will call same class 
        return new this('Genesis time','----','f1r57-h45h','Genesis data');
    }

    //after genesis block other all block are added
    static mineBlock(lastBlock,data){
      
        const lastHash = lastBlock.hash;
        const timestamp = Date.now();
       
        const hash = 'Todo-hash';
        return new this(timestamp,lastHash,hash,data);
    }
}

module.exports = Block;