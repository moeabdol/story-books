require('dotenv').config();

const express           = require('express');
const path              = require('path');
const passport          = require('passport');
const session           = require('express-session');
const exphbs            = require('express-handlebars');
const bodyParser        = require('body-parser');
const methodOverride    = require('method-override');
const mainRoutes        = require('./routes');
const authRoutes        = require('./routes/auth');
const storiesRoutes     = require('./routes/stories');
const handlebarsHelpers = require('./helpers/hbs');

const app = express();
const PORT = 3000;

// Configure static file directories
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

// Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure method-override middleware
app.use(methodOverride('_method'));

// Configure express-handlebars view engine
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    truncate: handlebarsHelpers.truncate,
    stripTags: handlebarsHelpers.stripTags,
    formatDate: handlebarsHelpers.formatDate,
    select: handlebarsHelpers.select
  }
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
app.use('/auth', authRoutes);
app.use('/stories', storiesRoutes);
app.use('/', mainRoutes);

app.listen(PORT, err => {
  if (err) return console.log(err);
  console.log('Server listening on port', PORT);
});
