const Story = require('../models/story');

const index = (req, res) => {
  Story.find({ status: 'public' })
    .populate('user')
    .sort({ date: 'desc' })
    .then(stories => res.render('stories/index', { stories }))
    .catch(err => console.log(err));
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

const show = (req, res) => {
  Story.findOne({ _id: req.params.id })
    .populate('user')
    .populate('comments.user')
    .then(story => {
      if (story.status === 'public') {
        res.render('stories/show', { story });
      } else {
        if (req.user) {
          if (req.user.id == story.user._id) {
            res.render('stories/show', { story });
          } else {
            res.redirect('/stories');
          }
        } else {
          res.redirect('/stories');
        }
      }
    })
    .catch(err => console.log(err));
};

const edit = (req, res) => {
  Story.findOne({ _id: req.params.id })
    .then(story => {
      if (story.user != req.user.id) return res.redirect('/stories');

      res.render('stories/edit', { story });
    })
    .catch(err => console.log(err));
};

const update = (req, res) => {
  Story.findById(req.params.id)
    .then(story => {
      let allowComments = true;

      if (!req.body.allowComments) allowComments = false;

      story.title = req.body.title;
      story.body = req.body.body;
      story.status = req.body.status;
      story.allowComments = allowComments;

      story.save()
        .then(story => res.redirect(`/stories/${story._id}`))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

const destroy = (req, res) => {
  Story.findByIdAndRemove(req.params.id)
    .then(() => res.redirect('/dashboard'))
    .catch(err => console.log(err));
};

const createComment = (req, res) => {
  Story.findById(req.params.id)
    .then(story => {
      story.comments.unshift({
        body: req.body.commentBody,
        user: req.user
      });

      story.save()
        .then((story) => res.redirect(`/stories/${story._id}`))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

const showUserStories = (req, res) => {
  Story.find({ user: req.params.id, status: 'public' })
    .populate('user')
    .then(stories => res.render('stories/index', { stories }))
    .catch(err => console.log(err));
};

const showMyStories = (req, res) => {
  Story.find({ user: req.user.id })
    .populate('user')
    .then(stories => res.render('stories/index', { stories }))
    .catch(err => console.log(err));
};

module.exports = {
  index,
  add,
  create,
  show,
  edit,
  update,
  destroy,
  createComment,
  showUserStories,
  showMyStories
};
