const Blockchain = require('./blockchain');
const Block = require('./block');
const express = require('express');
const app = express();
const port = 9000;
const readline = require('readline-sync');
const axios = require('axios'); 
// const router = express.Router();

let blockchainCount = 1;
const blockchain = new Blockchain();
blockchain.chain[0].data = ""; 

app.use(express.urlencoded({extended: true})); 

app.post('/', (req, res) => { 
    let word = req.body.userInput;
    const newData = word;
    blockchain.addBlock({data: newData});
    console.log(blockchain.chain[blockchainCount].data);           
    let loopThroughBlockChain = 1;  
    blockchainCount++;
    console.log();
})

app.listen(port, () => {
	console.log('Server is running...');
}); 
