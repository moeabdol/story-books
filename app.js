require('dotenv').config();

const express    = require('express');
const passport   = require('passport');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 3000;

// Configure passport
require('./config/passport')(passport);
app.use(passport.initialize());

app.get('/', (req, res) => {
  res.send('index page');
});

app.use('/auth', authRoutes);

app.listen(PORT, err => {
  if (err) return console.log(err);
  console.log('Server listening on port', PORT);
});
