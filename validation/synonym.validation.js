const Joi = require('joi');

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const synonymValidation = (data) => {
    const schema = Joi.object({
        desc_id: Joi.string()
            .pattern(objectIdPattern)
            .required(),

        dict_id: Joi.string()
            .pattern(objectIdPattern)
            .required()
    });

    return schema.validate(data, { abortEarly: false });
};

module.exports = synonymValidation;
