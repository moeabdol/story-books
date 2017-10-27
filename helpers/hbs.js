const moment = require('moment');

const truncate = (str, len) => {
  if (str.length > len && str.length > 0) {
    let newStr = str + ' ';
    newStr = str.substr(0, len);
    newStr = str.substr(0, newStr.lastIndexOf(' '));
    newStr = (newStr.length > 0) ? newStr : str.substr(0, len);
    return newStr + '...';
  }

  return str;
};

const stripTags = (input) => {
  return input.replace(/<(?:.|\n)*?>/gm, '');
};

const formatDate = (date, format) => {
  return moment(date).format(format);
};

module.exports = {
  truncate,
  stripTags,
  formatDate
};
