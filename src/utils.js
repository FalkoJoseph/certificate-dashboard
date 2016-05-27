/**
 * Parses the date string passed to it and returns a new date object
 *
 * @param {string} date_string The human readble date string that needs to be parsed
 */
function parseDate(date_string) {
  var date = new Date(Date.parse(date_string));
  return date;
};

/**
 * Takes a date string and returns the nuumber of days between now and the future date
 *
 * @param {string} date_string The human readble date string that needs to be parsed
 */
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
