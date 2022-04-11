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
 });