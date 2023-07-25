const joi = require("joi");

const schemaUser = joi.object({
    email: joi.string().email().required().messages({
        "string.email": "O campo email precisa ter um formato válido",
        "any.required": "O campo email é obrigatório",
        "string.empty": "O campo email é obrigatório",
    }),
    senha: joi
        .string()
        .min(3)
        .messages({
            "any.required": "O campo senha é obrigatório",
            "string.empty": "O campo senha é obrigatório",
            "string.min": "A senha precisa conter, no mínimo, 3 caracteres",
        })
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
});

module.exports = schemaUser;