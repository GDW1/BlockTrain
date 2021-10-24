const Blockchain = require('./blockchain');
const Block = require('./block');
const express = require('express');
const app = express();
const port = 9000;
const readline = require('readline-sync');
const axios = require('axios'); 
const fs = require("fs"); 
const onewordstory = require('./onestorywords');
// const FormData = require('form-data');

let blockchainCount = 1;
const blockchain = new Blockchain();
blockchain.chain[0].data = "";

var viewData = { 
    blockchaindata : [] 
}; 

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.post('/', (req, res) => { 
   //  const form = new FormData(); 
    const newData = req.body.userInput;
    blockchain.addBlock({data: newData});
    let currBlockData = blockchain.chain[blockchainCount].data;
    let newWord = {
        "word" : currBlockData
    }
    onewordstory.push(newWord); 
    fs.writeFile("onestorywords.json", JSON.stringify(onewordstory), err => {
     
        // Checking for errors
        if (err) throw err; 
       
        console.log("Done writing"); // Success
    });
    // const file = fs.readFile("onestorywords.json", err => {
     
    //     // Checking for errors
    //     if (err) throw err; 
       
    //     console.log("Done reading"); // Success);
    // });
    // form.append('file', file, "onestorywords.json");
    // console.log(form.getHeaders());

    console.log(currBlockData);             
    blockchainCount++;
    console.log();
})

// app.get('/', function(req, res, next) {
//     let objArray = [];
//     const file = fs.readFile("onestorywords.json", err => {
     
//         // Checking for errors
//         if (err) throw err; 
        
//         console.log("Done reading"); // Success);
//     });
//     objArray.push(file);
//     res.render('index', { data: JSON.stringify(objArray) })
// });


app.get('/onewordstoryjson', function (req, res) {
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(onewordstory));
})

// app.get('/search', (req, res) => {
//     res.header("Content-Type",'application/json');
//     res.sendFile(path.join(__dirname, './onestorywords.json'));
// })

app.listen(port, () => {
	console.log('Server is running...');
}); 
