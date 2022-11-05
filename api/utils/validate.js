const Joi = require("joi");

const validate = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(5).max(26).required().label("Username"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(8).max(26).required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = { validate };
