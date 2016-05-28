function parseDate(dateString) {
  if(dateString == '' || dateString == null) { return null; }
  var date = new Date(Date.parse(dateString));
  return date;
};

function getDaysLeft(dateString) {
  var now = Date.now();
  var then = new Date(Date.parse(dateString));
  var daysLeft = Math.round((then - now)/86400000);
  return daysLeft;
};

module.exports = {
  parseDate: parseDate,
  getDaysLeft: getDaysLeft
}
