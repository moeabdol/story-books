require('dotenv').config();

const express    = require('express');
const path       = require('path');
const passport   = require('passport');
const session    = require('express-session');
const exphbs     = require('express-handlebars');
const mainRoutes = require('./routes');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 3000;

// Configure static file directories
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

// Configure express-handlebars view engine
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

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

// Configure routes
app.use('/', mainRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, err => {
  if (err) return console.log(err);
  console.log('Server listening on port', PORT);
});
