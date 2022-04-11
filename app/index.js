const express = require("express");
const Blockchain = require("../src");
const bodyParser = require("body-parser");

const HTTP_PORT = process.env.HTTP_PORT || 3001;

//important  -you can not redirect post to get request or vice versa

const app = express();
app.use(express.json());
const blockchain = new Blockchain();

//sending the chain
app.get("/block", (req, res) => {
  res.json(blockchain.chain);
});

//adding the block to the chain
app.post("/mine", (req, res) => {
  const block = blockchain.addBlock(req.body.data);
  console.log(`new block added to the chain ${block.toString()}`);
  res.json(blockchain.chain);
});

app.listen(HTTP_PORT, () => {
  console.log(`listening on port ${HTTP_PORT}`);
});
