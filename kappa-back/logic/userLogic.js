const Joi = require("joi");

const validateUser = (user) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(5).max(30).required().messages({
      "string.min":
        "You must use a minimum of 5 characters in the username.\n\nDebe usar  mínimo 3 caracteres en el nombre de usuario.",
      "string.max":
        "You must use a maximum of 30 characters in the username.\n\nDebe usar  máximo 30 caracteres en el nombre de usuario.",
    }),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9#?!@$%^&*-]{5,30}$"))
      .required()
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.code) {
            case "string.pattern.base":
              err.message =
                "Incorrect password pattern. You must only use letters, numbers or special characters (#?!@$%^&*-) and you must use between 3 and 30 characters. \n\nPatrón de contraseña incorrecto. Solo debe usar letras, números o caracteres especiales (#?!@$%^&*-) y debe usar entre 3 y 30 caracteres.";
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    repeat_password: Joi.ref("password"),
    tACTelegram: Joi.optional(),
  })
    .with("password", "repeat_password")
    .messages({
      "object.with":
        "Passwords must match. \n\nLas contraseñas deben coincidir.",
    });

  return schema.validate(user);
};

exports.validateUser = validateUser;
