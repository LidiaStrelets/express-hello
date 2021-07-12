const { validationResult } = require('express-validator/check');

module.exports = function validationDecorator(actions = {}) {
  return Object.keys(actions).reduce((result, action) => {
    return {
      ...result,
      [action]: (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        actions[action](req, res, next);
      },
    };
  }, {});
};
