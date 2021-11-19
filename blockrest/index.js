const keyGenerator = require('./keyGenerator')
const Blockchain = require('./blockchain');
const Block = require('./block');
const Filter = require('bad-words');
const express = require('express');
const app = express();

var cors = require('cors');
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors({origin: "https://blocktrain.herokuapp.com"}));

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

//INCOMPLETE - Private Game

let gameBlockchains = {};
//id of global game is 0
let gameIDs = new Set();
gameIDs.add(0);



gameBlockchains[0] = new Blockchain();
gameBlockchains[0].createSevenBlocks();
var blockCount = 1;


//Generates Keys, change 10 to environmental variable
keyGenerator.generateKeys(30)

//GET iterates through keys, formats it as JSON, and sends it back to the frontend
//POST takes in user key and checks it with the array of keys and sends the status back to the frontend.
app.post('/userkeys', (req, res) => {
    const key = req.body.user_key
    if (keyGenerator.checkUserKey(key)) {
        return res.status(200).send("ACCESS GRANTED");
    }
    else {
        return res.status(403).send("Forbidden");
    }
})


//INCOMPLETE - Private Game
//params should be in form 
/*
    {
        params: {
            gameID: this.props.gameID
        }
    }

*/
app.get('/gameid', (req, res) => {
    let id = 0;
    while (gameIDs.has(id)){
        id = Math.floor(100000 + Math.random() * 900000);
    }
    gameIDs.add(id);
    gameBlockchains[id] = new Blockchain();
    gameBlockchains[id].createSevenBlocks();
    let idJSON = JSON.parse(JSON.stringify([{"gameID" : id}]));
    return res.status(200).json(idJSON);

})
//
app.post('/gameid', (req, res) => {
    let id = parseInt(req.body.gameID)
    if (id === NaN || !gameIDs.has(id)){
        return res.status(400).send("BAD REQUEST: invalid game ID")
    }
    else{
        return res.status(200).send("game with id " + id + " exists")
    }

})
//POST takes in user input and adds it to the blockchain
app.post('/trainwords', (req, res) => {
    const userWord = req.body.word
    const key = req.body.user_key
    const paramID = parseInt(req.body.gameID);
    if (keyGenerator.checkUserKey(key) || paramID !== 0) {
        if (!isProfanity(userWord)) {
            gameBlockchains[paramID].addBlock(new Block(Date.now(), userWord));
            blockCount++;
            return res.status(200).send("Created resource with " + userWord);
        }
        else {
            return res.status(403).send("Forbidden: no profanity");
        }
    }
    else{
        return res.status(400).send("BAD REQUEST: invalid user key");
    }
});
//GET iterates through blockchain, formats it as JSON, and sends it back to the client
app.get('/trainwords', (req, res) => {
    //iterate through all entries in blockchain
    let paramID = parseInt(req.query.gameID);
    if (!gameIDs.has(paramID)){
        return res.status(404).send("Game with id " + paramID + " not found");
    }
    //console.log(paramID);
    let rvArray = []
    //adds all entries into rv, starting with the last block
    tempHead = gameBlockchains[paramID].head;
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
