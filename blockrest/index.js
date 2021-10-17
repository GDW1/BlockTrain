const Blockchain = require('./blockchain');
const Block = require('./block');
const express = require('express');
const app = express();
const port = 9000;
const readline = require('readline-sync');

app.get('/', (request, response) => {
	response.write('Hello from ur mom\n');
    const blockchain = new Blockchain();

    var word = readline.question('Input a word ');
    blockchain.chain[0].data = word;
    response.write(blockchain.chain[0].data + '\n');

    for (let i=1; i<5; i++) {
        var word = readline.question('Input a word ');

        const newData = word;
        blockchain.addBlock({data: newData});
        response.write(blockchain.chain[i].data + '\n');
    }
    
	response.end();
});

app.listen(port, () => {
	console.log('Server is running...');
}); 

/*
const blockchain = new Blockchain();
for (let i=0; i<5; i++) {
    const newData = 'blocktrain'+i;
    blockchain.addBlock({data: newData});
}

console.log(blockchain);
*/