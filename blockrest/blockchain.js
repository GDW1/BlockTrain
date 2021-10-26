const Block = require('./block');
//TODO: add functions for verifying_chain_validity and proof_of_work
class Blockchain {
    //blockchain class adds new blocks inside the blockchain, starting with the genesis
    //instead of an empty array, the entire chain is filled with the genesis block
    constructor() {
        this.chain = [Block.genesis()];
    }
    //addBlock takes the word and creates a new block with mineBlock
    addBlock(data) {
        const newBlock = Block.mineBlock({
            lastBlock: this.chain[this.chain.length-1],
            data
        });
        // adds the new block to the chain
        this.chain.push(newBlock);
        console.log(`currlength: ${this.chain.length}`)
        console.log(this.chain[this.chain.length - 1])
    }
    //getData allows index based access to data in blockchain
    getData(index){
        return this.chain[index].data;
    }
    //returns current length of blockchain
    getSize(){
        return this.chain.length;
    }
}

module.exports = Blockchain;