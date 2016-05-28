const chai = require('chai');
const expect = chai.expect;
const config = require('../src/config');

describe('config', function() {
  it('returns https config object', function() {
    expect(config).to.eql({
      connectionTimeout: 5000
    });
  });
});
