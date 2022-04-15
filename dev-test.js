const Blockchain = require("./src");


const bc = new Blockchain();
for(var i =0; i<15;i++){
    console.log(bc.addBlock(`foo ${i}`).toString());

}