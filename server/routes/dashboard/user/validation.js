const { check, validationResult } = require('express-validator');
module.exports = {
    fields: [
        check("name").isLength({ min: 3 }).not().isEmpty(),
        check("password").isLength({ min: 6, max: 14 }).not().isEmpty(),
        check("mobile").isMobilePhone().not().isEmpty(),
        check("email").isEmail().not().isEmpty(),
    ],

    login: [
        check("email").isEmail(),
        check("password").isLength({ min: 5 })
    ],

    update:[
        check("id").not().isEmpty()
    ],


    validate: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.sendError(errors.array().map((item) => { return `${item.msg} ${item.param}`; }), errors.array().map((item) => { return `${item.msg} ${item.param}`; })[0], 422);
        }
        next()
      }
}
