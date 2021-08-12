
'use strict';

const Joi = require(`joi`);
const {
  RegisterMessage,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH
} = require(`../constants`);

module.exports = Joi.object({

  username: Joi.string()
                .required()
                .email()
                .messages({
                  'string.email': RegisterMessage.WRONG_EMAIL,
                  'any.required': RegisterMessage.REQUIRED_FIELD,
                }),

  password: Joi.string()
                .required()
                .min(MIN_PASSWORD_LENGTH)
                .max(MAX_PASSWORD_LENGTH)
                .messages({
                  'any.required': RegisterMessage.REQUIRED_FIELD,
                }),
});
