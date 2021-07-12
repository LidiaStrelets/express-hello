const { Users } = require('../models');
// const { validationResult } = require('express-validator/check');
const bcryptjs = require('bcryptjs');
const decorator = require('./../services/validation-decorator');
const { createToken } = require('./../services/auth-service');

function createUser(req, res, next) {
  // const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   return res.status(422).json({ errors: errors.array() });
  // }
  //   res.send(req.body);
  const { email } = req.body;

  Users.findOne({
    where: { email },
  })
    .then(user => {
      if (user) {
        return Promise.reject({ statusCode: 422, message: 'This email already exists!' });
      } else {
        const { login, password, email } = req.body;

        const salt = bcryptjs.genSaltSync(10);
        const pwdHashed = bcryptjs.hashSync(password, salt);

        return Users.create({ login, password: pwdHashed, email });
      }
    })
    .then(user => {
      res.json(user);
    })
    .catch(({ statusCode = 400, message = 'Oops, smthwent wrong' }) => {
      res.status(statusCode).json({ message });
    });
}

function login(req, res, next) {
  // console.log('Logining...');
  const loginUser = req.body;
  Users.login(loginUser)
    .then(createToken)
    .then(token => {
      res.json({ token });
      next();
    })
    .catch(error => {
      res.status(401).json({ error });
    });
}

module.exports = decorator({ createUser, login });
