const Joi = require("joi");

const validateUser = (user) => {
  const schema = Joi.object({
    username: Joi.required(),
    email: Joi.required(),
    role: Joi.required(),
    password: Joi.required(),
  });

  return schema.validate(user);
};

exports.validateUser = validateUser;
