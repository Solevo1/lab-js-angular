const Joi = require('joi');

const registrationValidator = async (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(15)
            .optional(),
        password: Joi.string()
            .min(8)
            .max(20)
            .required(),
        email: Joi.string()
            .email()
            .required(),
    });

    try {
        await schema.validateAsync(req.body);
        next();
    }
    catch (err) {
        next(err);
    }
};

module.exports = {
    registrationValidator,
}