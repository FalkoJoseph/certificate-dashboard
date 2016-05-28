const chai = require('chai');
const expect = chai.expect;

const validCertificateHosts = 'www.example1.com, www.example2.com';
const emptyCertificateHosts = 'www.example1.com,,, www.example2.com';

describe('monitoredHosts', function() {
  beforeEach(function () {
    delete process.env.MONITORED_CERT_HOSTS;
  });

  describe('when environment variable MONITORED_CERT_HOSTS is not set', function() {
    it('raises a missing environment error', function() {
      expect(function() { require('../src/monitored-hosts') }).to.throw(Error);
    })
  });

  describe('when environment variable MONITORED_CERT_HOSTS is set', function() {
    describe('when valid MONITORED_CERT_HOSTS string given', function() {
      it('returns an array of hosts to be monitored', function() {
        process.env.MONITORED_CERT_HOSTS = validCertificateHosts;
        const monitoredHosts = require('../src/monitored-hosts');

        expect(monitoredHosts).to.eql([
          'www.example1.com',
          'www.example2.com'
        ]);
      });

      it('removes empty entries', function() {
        process.env.MONITORED_CERT_HOSTS = emptyCertificateHosts;
        const monitoredHosts = require('../src/monitored-hosts');

        expect(monitoredHosts).to.eql([
          'www.example1.com',
          'www.example2.com'
        ]);
      });
    });

  });
});
