const index = (req, res) => {
  res.render('stories/index');
};

const add = (req, res) => {
  res.render('stories/add');
};

module.exports = {
  index,
  add
};
