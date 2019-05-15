import joi from 'joi';

module.exports = {
  /**
   * @param {user} object
   */
  validateUserInput(user) {
    const schema = joi.object().keys({
      email: joi
        .string()
        .email()
        .trim()
        .required(),
      firstName: joi
        .string()
        .regex(/^[A-Z]+$/)
        .trim()
        .uppercase()
        .required()
        .error(() => 'first name can only consist of alphabets'),
      lastName: joi
        .string()
        .regex(/^[A-Z]+$/)
        .trim()
        .uppercase()
        .error(() => 'last name can only consist of alphabets'),
      password: joi
        .string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .trim()
        .required(),
      confirmPassword: joi
        .any()
        .valid(joi.ref('password'))
        .required()
        .options({ language: { any: { allowOnly: 'must match password' } } }),
      street: joi
        .string()
        .trim()
        .required(),
      city: joi
        .string()
        .trim()
        .required(),
      state: joi
        .string()
        .trim()
        .required(),
      country: joi
        .string()
        .trim()
        .required(),
    });
    return joi.validate(user, schema);
  },

  verifyLogin(inputs) {
    const schema = joi.object().keys({
      email: joi
        .string()
        .email()
        .trim()
        .required(),
      password: joi
        .string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .trim()
        .required(),
    });
    return joi.validate(inputs, schema);
  },
};
