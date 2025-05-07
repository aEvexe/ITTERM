const Joi = require('joi');

const topicValidation = (data) => {
    const schema = Joi.object({
        author_id: Joi.string().hex().length(24).required(),
        topic_like: Joi.string().required(),           
        topic_text: Joi.string().required(),
        created_date: Joi.string().required(),         
        updated_date: Joi.string().required(),
        is_checked: Joi.string().valid("true", "false").required(),  
        is_approved: Joi.string().valid("true", "false").required()
    });

    return schema.validate(data, { abortEarly: false });
};

module.exports = topicValidation;
