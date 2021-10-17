// import crypto module (like a library)
const crypto = require('crypto');

// to create a hash, we need timestamp, lastHash, and word
const cryptoHash = (...inputs) => {
    // createHash('sha256') means we need to create a hash based on sha256 algorithm
    const hash = crypto.createHash('sha256');
    hash.update(inputs.sort().join(' '));
    return hash.digest('hex');
}
// we can get the current block's hash based on the previous blocks 3 properties
module.exports = cryptoHash;