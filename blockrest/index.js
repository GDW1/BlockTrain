const Blockchain = require('./blockchain');
const Block = require('./block');
const express = require('express');
const app = express();
const fs = require('fs')
var cors = require('cors');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors());

//const train = require('./routes/train')
//app.post('/trainwords', train)
const blockchain = new Blockchain();
blockchain.chain[0].data = "";
for (let i = 0; i < 6; i++){
    blockchain.addBlock("")
}
//POST takes in user input and adds it to t he blockchain
app.post('/trainwords', (req, res) => {
    const userWord = req.body.word
    blockchain.addBlock(userWord);
    return res.status(200).send("Created resource with " + userWord);
});
//GET iterates through blockchain, formats it as JSON, and sends it back to the frontend
app.get('/trainwords', (req, res) => {
    //iterate through all entries in blockchain
    rvArray = []
    for (let i = 0; i < blockchain.getSize(); i++){
        rvArray.push({"word": blockchain.getData(i), "wordNum": blockchain.getSize()});
    } 
    rvArrayJSON = JSON.parse(JSON.stringify(rvArray));
    //console.log(rvArrayJSON)
    return res.status(200).json(rvArrayJSON)
});


module.exports = app
