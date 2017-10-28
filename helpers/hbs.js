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

const select = (selected, options) => {
  return options.fn(this).replace(new RegExp(' value="' + selected + '"'),
    '$&selected="selected"').replace(new RegExp('>' + selected + '</option>'),
    'selected="selected"$&');
};

module.exports = {
  truncate,
  stripTags,
  formatDate,
  select
};
