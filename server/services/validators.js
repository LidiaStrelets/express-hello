const { body } = require('express-validator/check');

const validators = {
  userValidator: [
    body('email').trim().isEmail().normalizeEmail(),
    body('password')
      .not()
      .isEmpty()
      .trim()
      .isLength({ min: 5 })
      .withMessage('must contain at least 5 symbols!')
      .matches(/\d/)
      .withMessage('Must contain at least 1 number!'),
  ],
};

module.exports = validators;
