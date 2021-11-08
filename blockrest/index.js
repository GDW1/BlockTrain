const keyGenerator = require('./keyGenerator')

const Blockchain = require('./blockchain');
const Block = require('./block');
const express = require('express');
const app = express();
const fs = require('fs')
var cors = require('cors');
const {checkUserKey} = require("./keyGenerator");

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors());

//const train = require('./routes/train')
//app.post('/trainwords', train)
const blockchain = new Blockchain();
blockchain.chain[0].data = "";
for (let i = 0; i < 6; i++){
    blockchain.addBlock(new Block(Date.now(), ""));
    console.log('Is Data Valid?: ' + blockchain.isChainValid());
}

//Generates Keys, change 10 to environmental variable
keyGenerator.generateKeys(10)

//GET iterates through keys, formats it as JSON, and sends it back to the frontend
app.get('/userkeys', (req, res) => {
    let keyArray = []
    for (let i = 0; i < keyGenerator.getArray().length; i++){
        keyArray.push({"key": keyGenerator.getKey(i)})
    }
    let keyArrayJSON = JSON.parse(JSON.stringify(keyArray));
    return res.status(200).json(keyArrayJSON);
})

//POST takes in user input and adds it to the blockchain
app.post('/trainwords', (req, res) => {
    const userWord = req.body.word
    const key = req.body.user_key
    if (keyGenerator.checkUserKey(key)) {
        blockchain.addBlock(new Block(Date.now(), userWord));
        return res.status(200).send("Created resource with " + userWord);
    }
    else{
        return res.status(400).send("BAD REQUEST");
    }
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
