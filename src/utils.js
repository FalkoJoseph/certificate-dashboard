function parseDate(date_string) {
  var date = new Date(Date.parse(date_string));
  return date;
};

function getDaysLeft(date_string) {
  var now = Date.now();
  var then = new Date(Date.parse(date_string));
  var days_left = Math.round((then - now)/86400000);
  return days_left;
};

module.exports = {
  parseDate: parseDate,
  getDaysLeft: getDaysLeft
}
