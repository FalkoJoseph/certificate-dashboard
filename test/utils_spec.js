const chai = require('chai');
const utils = require('../src/utils');
const expect = chai.expect;

describe('utils', function() {

  describe('#parseDate', function() {
    it('parses a date string to date object', function() {
      var validDateString = new Date().toString();
      var parsedDate = utils.parseDate(validDateString);

      expect(parsedDate instanceof Date).to.equal(true);
    });

    it('returns null when invalid date string', function() {
      var invalidDateString = '';
      var parsedDate = utils.parseDate(invalidDateString);

      expect(parsedDate instanceof Date).to.equal(false);
      expect(parsedDate).to.equal(null);
    });
  });

  describe('#getDaysLeft', function() {
    it('calculates amount of days left untill renewal', function() {
      var now = new Date();
      var nowPlus5Days = new Date()
      nowPlus5Days.setDate(now.getDate() + 5);

      expect(utils.getDaysLeft(nowPlus5Days)).to.equal(5);
    });
  });


});

