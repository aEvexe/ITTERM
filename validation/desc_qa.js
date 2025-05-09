const Joi = require('joi');
const mongoose = require('mongoose');

const descQaValidation = (data) => {
  const schema = Joi.object({
    qa_id: Joi.string().custom(objectId).required().messages({
      'any.required': 'qa_id is required.'
    }),
    desc_id: Joi.string().custom(objectId).required().messages({
      'any.required': 'desc_id is required.'
    })
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = { descQaValidation };
