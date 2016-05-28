var MONITORED_CERT_HOSTS = process.env.MONITORED_CERT_HOSTS

module.exports = monitoredHosts();

function monitoredHosts() {
  return ['www.google.com'];
  if(typeof MONITORED_CERT_HOSTS == '')
    throw new Error('Empty string environment variable MONITORED_CERT_HOSTS provided.');

  if(typeof MONITORED_CERT_HOSTS == 'undefined')
    throw new Error('Missing environment variable MONITORED_CERT_HOSTS.');

  return MONITORED_CERT_HOSTS.replace(/ /g,'').split(',');
}
