var Promise = require('promise');
var https = require('https');
var Utils = require('./utils.js');
const config = require('./config');
const monitoredHosts = require('./monitored-hosts.js');

function getCertificationData() {
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
        var certificateInfo = _getCertificateInfo(host, cert);

        resolve(certificateInfo);
      });
    req.end()
    req.setTimeout(config.connectionTimeout);

    req.on('timeout',  function (err) {
      this.abort();
      resolve(_getCertificateInfo(host, {}))
    });

    req.on('error', function(err) {
      if(err.code == 'ECONNREFUSED') {
        resolve(_getCertificateInfo(host, {}));
      }
    });
  });
}

function _getCertificateInfo(host, certificate) {
  return {
    'server': host,
    'subject': {
      'org': certificate.subject ? certificate.subject.O : '-',
      'common_name': certificate.subject ? certificate.subject.CN : '-',
      'sans': certificate.subject ? certificate.subjectaltname : '-'
    },
    'issuer': {
      'org': certificate.issuer ? certificate.issuer.O : '-',
      'common_name': certificate.issuer ? certificate.issuer.CN : '-'
    },
    'info': {
      'valid_from': Utils.parseDate(certificate.valid_from),
      'valid_to': Utils.parseDate(certificate.valid_to),
      'days_left': certificate.valid_to ? Utils.getDaysLeft(certificate.valid_to): '-'
    }
  };
}

module.exports = {
  getCertificationData: getCertificationData
};
