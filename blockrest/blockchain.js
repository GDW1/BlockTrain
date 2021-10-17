const Block = require('./block');

class Blockchain {
    //blockchain class adds new blocks inside the blockchain, starting with the genesis
    //instead of an empty array, the entire chain is filled with the genesis block
    constructor() {
        this.chain = [Block.genesis()];
    }
    //addBlock takes the word and creates a new block with mineBlock
    addBlock({ data }) {
        const newBlock = Block.mineBlock({
            lastBlock: this.chain[this.chain.length-1],
            data
        });
        // adds the new block to the chain
        this.chain.push(newBlock);
    }
}

module.exports = Blockchain;