var MONITORED_CERT_HOSTS = process.env.MONITORED_CERT_HOSTS

module.exports = monitoredHosts();

function monitoredHosts() {
  return ['www.twoo.com', 'www.github.com', 'www.google.com'];
  if(typeof MONITORED_CERT_HOSTS == 'undefined')
    throw new Error('Missing environment variable MONITORED_CERT_HOSTS.');

  return MONITORED_CERT_HOSTS.replace(/ /g,'').split(',');
}
