import { expect } from 'chai';
import { logger } from '../src/index';

describe(`logger`, function() {
  describe(`logger.turnOn()`, function() {
    it('should make the logger.log(`hello`) return params, and you shoud see a hello', function() {
      expect(logger.log('hello')).to.be.deep.equal(undefined);
    });
  });
});
