const chai = require('chai');
const expect = chai.expect;

const sum = require('../src/lib/sum/');

describe("lib/sum", () => {

  context("when both are valid numbers", () => {
  	
    it("returns the sum of them", () => {
      expect(sum(1, 2)).to.equal(3);
    });
  });
});

