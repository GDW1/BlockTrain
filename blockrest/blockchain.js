const Block = require('./block')

const GenesisBlock = require('./genesisBlock');

class Blockchain {
    constructor(head = null) {
        this.head = new GenesisBlock(Date.now(), '');
        //console.log("Genesis hash: " + this.head.hash);
        this.difficulty = 3;
        this.nodes = new Set();
    }

    createSevenBlocks(){
        for (let i = 0; i < 7; i++){
            this.addBlock(new Block(Date.now(), ""));
            //console.log('Is Data Valid?: ' + blockchain.isChainValid());
        }
    }
    //creates the genesis block
    createGenesisBlock() {
        return new Block(Date.now(), "", "0");
    // gets the most recent block
    }
    getLast() {
        return this.head;
    }
    // gets the word from the most recent block
    getData() {
        return this.head.data;
    }
    //addBlock takes the word and creates a new block with mineBlock
    addBlock(newBlock) {
        newBlock.lastBlock = this.getLast();
        newBlock.lastHash = this.getLast().hash;
        //console.log("Previous Hash: " + newBlock.lastHash);
        newBlock.mineBlock(this.difficulty);
        this.head = newBlock;
        //console.log("Head points to: " + this.head.hash);
    }
    //checks that each hash hasn't changed
    isChainValid(){
        let currentBlock = this.head;
        let previousBlock = this.head.lastBlock;
        while (currentBlock.lastHash !== null) {
            if (currentBlock.hash !== currentBlock.calculateHash())
                return false;
            if (currentBlock.lastHash !== previousBlock.hash)
                return false;
            currentBlock = currentBlock.lastBlock;
            previousBlock = currentBlock.lastBlock;
        }
        return true;
    }

}

module.exports = Blockchain;