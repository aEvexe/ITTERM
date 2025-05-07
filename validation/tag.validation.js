const Joi = require('joi');

const tagValidation = (data) => {
    const schema = Joi.object({
        topic_id: Joi.string(),
        category_id: Joi.string()
    });

    return schema.validate(data, { abortEarly: false }); 
};

module.exports = tagValidation;
