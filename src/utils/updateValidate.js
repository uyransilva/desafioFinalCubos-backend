const joi = require("joi");

const schemaUpdate = joi.object({
    nome: joi.string().required().min(3).max(40).messages({
        "any.required": "O campo nome é obrigatório",
        "string.empty": "O campo nome é obrigatório",
        "string.max": "O campo nome deve ter no máximo 40 caracteres",
        "string.min": "O campo nome deve ter no mínimo 3 caracteres",
    }),
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
            "string.min": "A senha precisa conter, no mínimo 3 caracteres",
        })
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    cpf: joi
        .optional()
        .allow(''),
    telefone: joi
        .optional()
        .allow('')
});

module.exports = schemaUpdate;