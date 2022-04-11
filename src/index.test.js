const Blockchain = require("./index");
const Block = require("./block");
const { expect } = require("chai");

//collection of all the test cases
describe("Blockchain", () => {
  let blockchain;
  let blockchain2;

  //this block will run after each test case
  beforeEach(() => {
    blockchain = new Blockchain();
    blockchain2 = new Blockchain();
  });

  it("start with genesis block", () => {
    //for comparing the collection you have to use deep.equal not only equal
    expect(blockchain.chain[0]).to.deep.equal(Block.genesis());
  });
  it("add a new block", () => {
    //adding data block to the chain
    const data = "foo";
    blockchain.addBlock(data);

    //checking if the data has been added or not
    expect(blockchain.chain[blockchain.chain.length - 1].data).equal(data);
  });

  it("chain is validate", () => {
    //creating chain
    const data = "kandarp";
    blockchain2.addBlock(data);

    //checking if the chain is valid or not(genesis one)
    expect(blockchain2.isChainValidate(blockchain2.chain)).to.be.true;
  });
  it("chain is not validate", () => {
    //creating chain
    const data = "kandarp";
    blockchain2.addBlock(data);

    //changing the chain
    blockchain2.chain[1].data = "kan";
    //checking if the chain is valid or not(genesis one)
    expect(blockchain2.isChainValidate(blockchain2.chain)).to.be.false;
  });

  //replace the chain if the incoming chain is longer than the current chain and valid also
  it("replace the chain by the original chain if it is longer and valid", () => {
    //adding the block to the the secondary chain
    blockchain2.addBlock("kandarp sharda");

    //trying to replace the block
    blockchain.replaceChain(blockchain2.chain);

    //checking if the chain has been replaced or not
    expect(blockchain2.chain).to.deep.equal(blockchain.chain);
  });
  //not replce the chain if teh incoming chain is not longer than the current chain
  it("do not replace the chain with less than the original chainlength", () => {

    //adding block to the primary chain
    blockchain.addBlock("after genesis block");

    //trying to replcae primary chain with the secondary chain
    blockchain.replaceChain(blockchain2.chain);
    
    //checking if the secondary chain has replaced the primary chain or not
    expect(blockchain.chain).to.deep.not.equal(blockchain2.chain);
  });
});
