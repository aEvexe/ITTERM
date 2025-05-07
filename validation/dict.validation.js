const Joi = require('joi');

const dictValidate = (data) => {
    const schema = Joi.object({
        term: Joi.string().min(1).max(255).required(),
    });

    return schema.validate(data);
};

module.exports = dictValidate;
