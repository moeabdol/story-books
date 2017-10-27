const Story = require('../models/story');

const index = (req, res) => {
  res.render('stories/index');
};

const add = (req, res) => {
  res.render('stories/add');
};

const create = (req, res) => {
  let allowComments = true;

  if (!req.body.allowComments) allowComments = false;

  new Story({
    title: req.body.title,
    body: req.body.body,
    status: req.body.status,
    allowComments: allowComments,
    user: req.user.id
  }).save()
    .then(story => res.redirect(`/stories/${story._id}`))
    .catch(err => console.log(err));
};

module.exports = {
  index,
  add,
  create
};
