const joi = require("joi");

const schemaCharges = joi.object({
    nome: joi.string().required().min(3).messages({
        "any.required": "O campo NOME é obrigatório",
        "string.empty": "O campo NOME é obrigatório",
        "string.min": "O campo NOME deve ter no mínimo 3 caracteres",
    }),
    descricao: joi.string().required().min(3).messages({
        "any.required": "O campo DESCRIÇÃO é obrigatório",
        "string.empty": "O campo DESCRIÇÃO é obrigatório",
        "string.min": "O campo DESCRIÇÃO deve ter no mínimo 3 caracteres",
    }),
    cliente_id: joi.number().optional().allow(""),
    valor: joi.string().optional().allow(""),
    vencimento: joi.string().optional().allow(""),
    status: joi.string().optional().allow(""),
});

module.exports = schemaCharges;
