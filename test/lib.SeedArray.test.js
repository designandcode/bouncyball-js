const chai = require('chai');
const expect = chai.expect;

//const SeedArray = require('../src/lib/SeedArray/');
import SeedArray from '../src/lib/SeedArray/';

describe('lib/SeedArray', () => {

  context('when total is 20', () => {

    let config = [{small: 0.9}, {medium: 0.1}]

    it('returns an array with 20 items are returned', () => {
      expect(SeedArray(20, config).length).to.equal(20);
    });
  });

  context('when total is 20 and small is 0.9', () => {

    let config = [{small: 0.9}, {medium: 0.1}];

    it('returns an array with 18 small', () => {
      let smalls = SeedArray(20, config).filter(x => x === 'small');
      expect(smalls.length).to.equal(18);
    });
  });

  context('when total is 20 and medium is 0.1', () => {

    let config = [{small: 0.9}, {medium: 0.1}];

    it('returns an array with 2 medium', () => {
      let mediums = SeedArray(20, config).filter(x => x === 'medium');
      expect(mediums.length).to.equal(2);
    });
  });
});
