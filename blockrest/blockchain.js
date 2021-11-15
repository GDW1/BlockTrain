const Block = require('./block');
//TODO: add functions for verifying_chain_validity and proof_of_work
class Blockchain {
    //blockchain class adds new blocks inside the blockchain, starting with the genesis
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 3;
    }
    //creates the genesis block
    createGenesisBlock() {
        return new Block(Date.now(), "Genesis Block", "0");
    }
    //returns the last block
    getLatestBlock() {
        return this.chain[this.chain.length-1];
    }
    //addBlock takes the word and creates a new block with mineBlock
    addBlock(newBlock) {
        newBlock.lastHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
        //console.log(`currlength: ${this.chain.length}`)
        //console.log(this.chain[this.chain.length - 1])
    }
    //checks that each hash hasn't changed
    isChainValid(){
        for (let i=1; i<this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            if(currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if(currentBlock.lastHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
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