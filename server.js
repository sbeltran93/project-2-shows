const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const authController = require('./controllers/auth.js');
const tvshowsController = require('./controllers/tvshows.js');
const usersController = require('./controllers/users.js')
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

const port = process.env.PORT ? process.env.PORT : '3000';


mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.once('open', () => {
})

mongoose.connection.on('connected', () => {
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passUserToView)
app.use('/auth', authController);
app.use(isSignedIn);
app.use('/users', usersController);
app.use('/users/:userId/tvshows',tvshowsController);


app.get('/', (req, res) => {
  res.render('index.ejs', {
    user: req.session.user,
  });
});

app.get('/vip-lounge', (req, res) => {
  if (req.session.user) {
    res.send(`Welcome to the party ${req.session.user.username}.`);
  } else {
    res.send('Sorry, no guests allowed.');
  }
});


app.post('/users/:userId/tvshows', async (req, res) => {
  try{ 

  } catch (error) {
    res.status(400).json({msg: error.message})
  }
})



app.use('/auth', authController);

app.listen(port, () => {
});
