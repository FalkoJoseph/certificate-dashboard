var Promise = require('promise');
var https = require('https');
var Utils = require('./utils.js');
const config = require('./config');
const monitoredHosts = require('./monitored-hosts.js');

function getCertificationData() {
  const run_date = new Date().toDateString();

  var promises = [];

  for (var i = 0; i < monitoredHosts.length; ++i) {
    var host = monitoredHosts[i];
    promises.push(_getRequestPromise(host));
  }

  return new Promise(function(resolve, reject) {
    Promise.all(promises).then(function(values) {
      var data = {};
      for(var i = 0; i < values.length; i++) {
        var index = i+1;
        data[index] = values[i]
      }

      resolve(data);
    });
  });
};

function _getRequestPromise(host) {
  return new Promise(function(resolve, reject) {
    var req = https.request(
      { hostname: host, port: 443, method: 'GET', agent: false },
      function(res) {
        var cert = res.connection.getPeerCertificate();
        var parsed = {
          'server': host,
          'subject': {
            'org': cert.subject.O,
            'common_name': cert.subject.CN,
            'sans': cert.subjectaltname
          },
          'issuer': {
            'org': cert.issuer.O,
            'common_name': cert.issuer.CN
          },
          'info': {
            'valid_from': Utils.parseDate(cert.valid_from),
            'valid_to': Utils.parseDate(cert.valid_to),
            'days_left': Utils.getDaysLeft(cert.valid_to)
          }
        };

        resolve(parsed);
      });
    req.end()

    req.on('timeout',  function (err) {
      this.abort();
      reject(err);
    });


  });
}

module.exports = {
  getCertificationData: getCertificationData
};
