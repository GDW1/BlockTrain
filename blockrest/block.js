//this imports the GENESIS_DATA for our block
const { GENESIS_DATA } = require('./genesis.js');
const cryptoHash = require('./crypto-hash');

class Block {
    constructor({timestamp, lastHash, hash, data}) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }
    //genesis() function calls the constructor to create the genesis block for our blockchain
    static genesis() {
        return new this(GENESIS_DATA);
    }
    // we have only previously defined the GENESIS_DATA, not the block.
    // our first object we create will become the genesis block (I think)

    //mineBlock will return a new Block based on the previous block
    static mineBlock({lastBlock, data}) {
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        return new this({
            timestamp,
            lastHash,
            data,
            hash: cryptoHash(timestamp, lastHash, data)
        });
    }
}

module.exports = Block;