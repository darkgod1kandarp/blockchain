const Block =  require("./block");

const block =  new Block("test", "test", "test", "test");

console.log(block.toString())
console.log(Block.genesis().toString())