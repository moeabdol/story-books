require('dotenv').config();

const express    = require('express');
const passport   = require('passport');
const session    = require('express-session');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 3000;

// Configure express-session middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Configure passport middleware (must be included after express-session)
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Set global variables
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.get('/', (req, res) => {
  res.send('index page');
});

// Configure routes
app.use('/auth', authRoutes);

app.listen(PORT, err => {
  if (err) return console.log(err);
  console.log('Server listening on port', PORT);
});
