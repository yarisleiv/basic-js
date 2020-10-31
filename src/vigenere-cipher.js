const CustomError = require("../extensions/custom-error");

class VigenereCipheringMachine {
  constructor(isNotReverse) {
    this.alphabetArray = [`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`, `T`, `U`, `V`, `W`, `X`, `Y`, `Z`];
    if (isNotReverse === false) {
      this.isReverse = true;
    }
  }

  _readyMessageAndKey(message, key) {
    const readyMessage = message.match(/[a-zA-Z]+/g).join('').toUpperCase();
    let readyKey = key.match(/[a-zA-Z]+/g).join('').toUpperCase();

    if (readyMessage.length > readyKey.length) {
      readyKey = readyKey.padEnd(readyMessage.length, readyKey);
    } else if (readyMessage.length < readyKey.length) {
      readyKey = readyKey.substring(0, readyMessage.length);
    }

    return [readyMessage, readyKey];
  }

  _returnNonLatinChars(message, output) {
    message.split('').forEach((char, index) => {
      if (!this.alphabetArray.includes(char.toUpperCase())) {
        output.splice(index, 0, char);
      }
    });
    return output;
  }

  encrypt(message, key) {
    if (!message || !key) {
      throw new Error('Wrong parameters');
    }

    const readyMessageAndKey = this._readyMessageAndKey(message, key);
    const messageArray = readyMessageAndKey[0].split('');
    const keyArray = readyMessageAndKey[1].split('');
    let output = [];

    messageArray.forEach((letter, index) => {
      const messageAlphabetIndex = this.alphabetArray.indexOf(letter);
      const keyAlphabetIndex = this.alphabetArray.indexOf(keyArray[index]);
      const sumIndex = messageAlphabetIndex + keyAlphabetIndex;
      const outputAlphabetIndex = (sumIndex >= 26) ? sumIndex - 26 : sumIndex;
      output.push(this.alphabetArray[outputAlphabetIndex]);
    });

    const result = this._returnNonLatinChars(message, output);
    return this.isReverse ? result.reverse().join('') : result.join('');
  }

  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) {
      throw new Error('Wrong parameters');
    }

    const readyEncryptedMessageAndKey = this._readyMessageAndKey(encryptedMessage, key);
    const encryptedMessageArray = readyEncryptedMessageAndKey[0].split('');
    const keyArray = readyEncryptedMessageAndKey[1].split('');
    let output = [];

    encryptedMessageArray.forEach((letter, index) => {
      const encryptedMessageAlphabetIndex = this.alphabetArray.indexOf(letter);
      const keyAlphabetIndex = this.alphabetArray.indexOf(keyArray[index]);
      const diffIndex = encryptedMessageAlphabetIndex - keyAlphabetIndex + 26;
      const outputAlphabetIndex = (diffIndex >= 26) ? diffIndex - 26 : diffIndex;
      output.push(this.alphabetArray[outputAlphabetIndex]);
    });

    const result = this._returnNonLatinChars(encryptedMessage, output);
    return this.isReverse ? result.reverse().join('') : result.join('');
  }
}

module.exports = VigenereCipheringMachine;
