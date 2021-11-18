const axios = require('axios');

const Block = require('./block');
//TODO: add functions for verifying_chain_validity and proof_of_work
class Blockchain {
    //blockchain class adds new blocks inside the blockchain, starting with the genesis
    constructor() {
        this.chain = [this.createGenesisBlock()];
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
    isChainValid(checkChain){
        for (let i=1; i<checkChain.length; i++){
            const currentBlock = checkChain[i];
            const previousBlock = checkChain[i-1];
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
    reachConsensus(){
        //checks if any neighboring nodes have a longer, valid chain
        let maxLength = this.chain.length;
        let newChain = [];
        this.nodes.forEach((url) => {
            let response = axios.get(url.href + '/chain');
            if (response.status === 200){
                let currChain = JSON.parse(response);
                if (currChain.chain.length > maxLength && this.isChainValid(currChain)){
                    maxLength = currChain.length;
                    newChain = currChain;
                }

            }
        }
        )
        if (newChain != []){
            this.chain = newChain;
            //chain was replaced by longer chain from another node
            return true;
        }
        //chain is longest valid chain, was not replaced.
        return false;
    }

    //adds a new node to this blockchain at address
    registerNode(address){
        let nodeURL;
        try {
            nodeURL = new URL(address);
        } catch {
            return false;
        }
        if (nodeURL.protocol === 'http:' || nodeURL.protocol === 'https:'){
            this.nodes.add(nodeURL);
            return true;
        }
        else{
            return false;
        }
    }
}

module.exports = Blockchain;