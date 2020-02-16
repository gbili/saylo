import { expect } from 'chai';
import { logger } from '../src/index';

describe(`logger`, function() {
  describe(`logger.turnOn()`, function() {
    it('should make the logger.log(`hello`) return params, and you shoud see a hello', function() {
      logger.turnOn();
      expect(logger.log('hello')).to.be.deep.equal(['hello']);
    });
  });
  describe(`logger.turnOn('hey')`, function() {
    it('should make the logger.hey(`hello`, `you`) return [`hello`, `you`], and you shoud see a hello you', function() {
      logger.turnOn('hey');
      expect(logger.hey('hello', `you`)).to.be.deep.equal(['hello', 'you']);
    });
  });
  describe(`logger.turnOff()`, function() {
    it('should make the logger.log() return false, and you should not see anything', function() {
      logger.turnOff();
      expect(logger.log('hello')).to.be.equal(undefined);
    });
  });
});
