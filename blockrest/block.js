const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(timestamp, data, lastHash = '') {
        this.timestamp = timestamp;
        this.data = data;
        this.lastHash = lastHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    // takes the properties of our block and generates the resulting hash
    calculateHash() {
        return SHA256(this.timestamp + this.lastHash + JSON.stringify(this.data) + this.nonce).toString();
    }
    //includes bitcoin style proof of work (hash must have n amount of leading 0s)
    mineBlock(difficulty) {
        while(this.hash.substring(0,difficulty) !== Array(difficulty+1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        //console.log("Block mined: " + this.hash);
    }
    
}

module.exports = Block;