const generateUniqueId = require('generate-unique-id');

let keys = ["j9ddj1yepcnrwvfb"];

// Generates numKeys amount of keys
const generateKeys = (numKeys) => {
    console.log(keys[0]);
    for (let i = 0; i < numKeys; i++) {
        const id = generateUniqueId({
            length: 16,
            useLetters: true
        });
        console.log(id);
        keys.push(id);
    }
}

// Checks if the key the user entered is a valid key. Returns true if valid, false otherwise.
const checkUserKey = (userKey) => {
    return keys.includes(userKey);
}

const getKey = (index) => {
    return keys[index];
}

const getArray = () => {
    return keys;
}

exports.generateKeys = generateKeys;
exports.checkUserKey = checkUserKey;
exports.getKey = getKey;
exports.getArray = getArray;