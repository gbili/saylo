import { expect } from 'chai';
import Nomonichas from '../src/Nomonichas';

describe(`Nomonichas`, function() {
  it('it should be instantiable', function() {
    expect(new Nomonichas).to.be.an('object');
  });
});
