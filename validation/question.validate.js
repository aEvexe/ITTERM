const Joi = require('joi');
const mongoose = require('mongoose');

const questionValidation = (data) => {
  const schema = Joi.object({
    question: Joi.string()
      .trim()
      .min(5)
      .max(500)
      .required(),

    answer: Joi.string()
      .trim()
      .min(1)
      .required(),
      
    created_date: Joi.string().required(),
    updated_date: Joi.string().required(),
    is_checked: Joi.string().required(),
    user_id: Joi.string().custom(objectId),
    expert_id: Joi.string().custom(objectId),
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = { questionValidation };
