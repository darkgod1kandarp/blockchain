
const Block =  require("./block");
var expect = require('chai').expect;

//break the test into components 
describe("Block", () => {
     let data , prevBlock , block;

     //initialize before every test case
     beforeEach(() => {
         data = 'foo';
        prevBlock = Block.genesis();
        block = Block.mineBlock(prevBlock, data);
     })

     //first test case 
     it('sets the data to match the input', () => {
         expect(block.data).equal(data);
     })

     //second test case
     it('sets the previous hash to match  input block lasthash', () => {
         expect(block.lastHash).equal(prevBlock.hash);
     })

     it('generating hash that matches the difficulty levels',()=>{
      
         expect(block.hash.substring(0,block.difficulty)).equal("0".repeat(block.difficulty));

        })

     it('Lowers the difficulty if slow mining is going on',()=>{
        
         expect(Block.adjustDifficulty(block,block.timestamp+50000)).equal(block.difficulty - 1);
     })
     it('higher the difficulty if the high minning is going on',()=>{
         expect(Block.adjustDifficulty(block,block.timestamp -50000)).equal(block.difficulty +1);
     })
 });