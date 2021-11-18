const keyGenerator = require('./keyGenerator')
const Blockchain = require('./blockchain');
const Block = require('./block');
const express = require('express');
const app = express();
const fs = require('fs')
const Filter = require('bad-words');
var cors = require('cors');
const { ppid } = require('process');

const filter = new Filter();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors({origin: "https://blocktrain.herokuapp.com"}));

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

//INCOMPLETE - Private Game

let gameBlockchains = {};
//id of global game is 0
let gameIDs = new Set([0]);



gameBlockchains[0] = new Blockchain();
gameBlockchains[0].createSevenBlocks();

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


//INCOMPLETE - Private Game
app.post('/gameid', (req, res) => {
    let id = 0;
    while (gameIDs.has(id)){
        id = Math.floor(100000 + Math.random() * 900000);
    }
    gameIDs.add(id);
    gameBlockchains[id] = new Blockchain();
    let idJSON = JSON.parse(JSON.stringify([{"gameID" : id}]));
    return res.status(200).json(idJSON);

})

//POST takes in user input and adds it to the blockchain
app.post('/trainwords', (req, res) => {
    const userWord = req.body.word
    const key = req.body.user_key
    if (keyGenerator.checkUserKey(key)) {
        if (!isProfanity(userWord)) {
            gameBlockchains[0].addBlock(new Block(Date.now(), userWord));
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
//GET iterates through blockchain, formats it as JSON, and sends it back to the client
app.get('/trainwords', (req, res) => {
    //iterate through all entries in blockchain
    let rvArray = []
    for (let i = 0; i < gameBlockchains[0].getSize(); i++){
        rvArray.push({"word": gameBlockchains[0].getData(i), "wordNum": gameBlockchains[0].getSize()});
    } 
    let rvArrayJSON = JSON.parse(JSON.stringify(rvArray));
    //console.log(rvArrayJSON)
    return res.status(200).json(rvArrayJSON)
});

app.get('/chain', (req, res) => {
    return res.status(200).send(JSON.stringify(gameBlockchains[0]));
})

app.post('/register', (req, res) => {
    const newNodes = req.body.nodes;
    if (newNodes === null){
        return res.status(400).send("Please enter a valid list of nodes")
    }
})


module.exports = app
