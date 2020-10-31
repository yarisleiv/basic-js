const CustomError = require("../extensions/custom-error");

const chainMaker = {
  getLength() {
    'use strict';

    return this.chain.split('~~').length - 1;
  },
  addLink(value) {
    'use strict';

    if (value === undefined) {
      value = '';
    }

    if (!this.chain) {
      this.chain = `( ${value} )~~`;
    } else {
      this.chain += `( ${value} )~~`;
    }

    return chainMaker;
  },
  removeLink(position) {
    'use strict';

    this.chain = this.chain.split('~~');


    if (!Number.isInteger(position) || position < 1 || position > this.chain.length - 1) {
      this.chain = '';
      throw new Error('Wrong position!');
    }

    this.chain.splice(position - 1, 1);
    this.chain = this.chain.join('~~');

    return chainMaker;
  },
  reverseChain() {
    'use strict';

    if (!this.chain) {
      return chainMaker;
    }

    this.chain = this.chain.split('~~');
    this.chain.pop();
    this.chain = this.chain.reverse().join('~~') + '~~';

    return chainMaker;
  },
  finishChain() {
    'use strict';

    const result = this.chain.slice(0, -2);

    this.chain = '';

    return result;
  }
};

module.exports = chainMaker;
