const SHA256 = require('crypto-js/sha256');

class GenesisBlock {
    constructor(timestamp, data = '') {
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
        this.lastHash = null;
        this.lastBlock = null;
    }
    calculateHash() {
        return SHA256(this.timestamp + JSON.stringify(this.data)).toString();
    }
}
module.exports = GenesisBlock;