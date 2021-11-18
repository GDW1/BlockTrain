const keyGenerator = require('./keyGenerator')
const Blockchain = require('./blockchain');
const Block = require('./block');
const Filter = require('bad-words');
const express = require('express');
const app = express();

var cors = require('cors');
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors());

const filter = new Filter();

function isProfanity(word) {

    if(filter.isProfane(word))
        return true;
    for (let i=0; i<word.length-2; i++) 
        if (word.substring(i,i+3).toLowerCase() === 'fck' || word.substring(i,i+3).toLowerCase() === 'nlg' || word.substring(i,i+3).toLowerCase() === 'ngg' || word.substring(i,i+3).toLowerCase() === 'fgg') 
            return true;
    for (let i=0; i<word.length-3; i++) 
        if (word.substring(i,i+4).toLowerCase() === 'shit' || word.substring(i,i+4).toLowerCase() === 'shlt' || word.substring(i,i+4).toLowerCase() === 'shjt' || word.substring(i,i+4).toLowerCase() === 'iigg' || word.substring(i,i+4).toLowerCase() === 'nigg' || word.substring(i,i+4).toLowerCase() === 'nigl' || word.substring(i,i+4).toLowerCase() === 'njgg' || word.substring(i,i+4).toLowerCase() === 'nygg' || word.substring(i,i+4).toLowerCase() === 'nicg' || word.substring(i,i+4).toLowerCase() === 'fuck' || word.substring(i,i+4).toLowerCase() === 'dick' || word.substring(i,i+4).toLowerCase() === 'dlck' || word.substring(i,i+4).toLowerCase() === 'djck') 
            return true;
    for (let i=0; i<word.length-4; i++) 
        if (word.substring(i,i+5).toLowerCase() === 'bitch' || word.substring(i,i+5).toLowerCase() === 'bltch' || word.substring(i,i+5).toLowerCase() === 'bjtch') 
            return true;

    return false;
}

//const train = require('./routes/train')
//app.post('/trainwords', train)
var blockCount = 1;
const blockchain = new Blockchain();
for (let i = 0; i < 6; i++){
    blockchain.addBlock(new Block(Date.now(), ''));
    blockCount++;
}

//Generates Keys, change 10 to environmental variable
keyGenerator.generateKeys(30)

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
        if (!isProfanity(userWord)) {
            blockchain.addBlock(new Block(Date.now(), userWord));
            blockCount++;
            return res.status(200).send("Created resource with " + userWord);
        }
        else {
            return res.status(403).send("Forbidden");
        }
    }
    else{
        return res.status(400).send("BAD REQUEST");
    }
});
//GET iterates through blockchain, formats it as JSON, and sends it back to the frontend
app.get('/trainwords', (req, res) => {
    rvArray = []; 
    //adds all entries into rv, starting with the last block
    tempHead = blockchain.head;
    while (tempHead !== null) {
        rvArray.push({ "word" : tempHead.data, "wordNum" : blockCount});
        tempHead = tempHead.lastBlock;
    }
    //reverse the array since it starts with the last block
    const size = rvArray.length;
    for (let i=0; i<size/2; i++) {
        temp = rvArray[i];
        rvArray[i] = rvArray[rvArray.length-i-1];
        rvArray[rvArray.length-i-1] = temp;
    }

    rvArrayJSON = JSON.parse(JSON.stringify(rvArray));
    //console.log(rvArrayJSON)
    return res.status(200).json(rvArrayJSON)
});


module.exports = app
