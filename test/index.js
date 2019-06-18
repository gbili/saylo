import { expect } from 'chai';

describe('Basic Chai String Test', function () {
  it('should return number of charachters in a string', function () {
    expect("Hello".length).to.be.equal(4);
  });

  it('should return first charachter of the string', function () {
    expect("Hello".charAt(0)).to.be.equal('H');
  });
});
