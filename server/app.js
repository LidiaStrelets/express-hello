const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { userValidator } = require('./services/validators');
const userController = require('./controllers/users-controller');

app.use(express.json());

app.get(
  '/hello',
  (req, res, next) => {
    // res.send('hi, friend!');
    console.log('authentification phase');
    next();
  },
  (req, res, next) => {
    console.log('main phase');
    res.send('hi, friend!');
  },
);

app.post('/api/signup', userValidator, userController.createUser);
app.post('/api/login', userValidator, userController.login);

app.listen(4000, () => {
  console.log('Server running on port 4000...');
});
