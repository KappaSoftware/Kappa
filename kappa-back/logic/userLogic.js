const Joi = require("joi");

const validateUser = (user) => {
  const schema = Joi.object({
    username: Joi.required(),
    password: Joi.required(),
    tACTelegram: Joi.optional(),
  });

  return schema.validate(user);
};

exports.validateUser = validateUser;
