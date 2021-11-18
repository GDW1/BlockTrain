class GenesisBlock {
    constructor(timestamp, data = '') {
        this.timestamp = timestamp;
        this.data = data;
        this.hash = '7b15ee6437cb4d6dbe2f5734af72f5e767a8c296b0f43999a6a587b2b93744d8'; // "Blocktrain" in sha256
        this.lastHash = null;
        this.lastBlock = null;
    }
}
module.exports = GenesisBlock;