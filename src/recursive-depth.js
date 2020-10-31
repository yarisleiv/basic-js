const CustomError = require("../extensions/custom-error");

module.exports = class DepthCalculator {
  constructor() {
    this.maxDepth = 1;
    this.currentDepth = 1;
    this.calculateDepth = this.calculateDepth.bind(this);
    this.isIncludedArray = false;
  }

  calculateDepth(arr) {
    if (!this.isIncludedArray) {
      this.maxDepth = 1;
      this.currentDepth = 1;
    }
    arr.forEach((item) => {
      this.isIncludedArray = true;
      if (Array.isArray(item)) {
        this.currentDepth++;
        if (this.currentDepth > this.maxDepth) {
          this.maxDepth++;
        }
        this.calculateDepth(item);
        this.currentDepth--;
      }
      this.isIncludedArray = false;
    });
    return this.maxDepth;
  }
};