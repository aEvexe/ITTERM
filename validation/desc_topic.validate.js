const Joi = require('joi');

const desc_topicValidation = (data) => {
    const schema = Joi.object({
        desc_id: Joi.string().hex().length(24).required(),
        topic_id: Joi.string().hex().length(24).required()
    })
    return schema.validate(data, {abortEarly: false})
}

module.exports = desc_topicValidation 