const joi = require("joi");

const schemaClient = joi.object({
  nome: joi.string().required().min(3).max(40).messages({
    "any.required": "O campo NOME é obrigatório",
    "string.empty": "O campo NOME é obrigatório",
    "string.max": "O campo NOME deve ter no máximo 40 caracteres",
    "string.min": "O campo NOME deve ter no mínimo 3 caracteres",
  }),
  email: joi.string().email().required().messages({
    "string.email": "O campo EMAIL precisa ter um formato válido",
    "any.required": "O campo EMAIL é obrigatório",
    "string.empty": "O campo EMAIL é obrigatório",
  }),
  cpf: joi
    .required(),
  telefone: joi
    .string()
    .max(15)
    .min(11)
    .pattern(new RegExp("([(])?([0-9]{2})(.)([0-9]{5})([-])?([0-9]{4})"))
    .messages({
      "any.required": "O campo TELEFONE é obrigatório",
      "string.empty": "O campo TELEFONE é obrigatório",
      "string.min": "O campo TELEFONE precisa conter, no mínimo 11 caracteres",
      "string.max": "O campo TELEFONE deve ter no máximo 15 caracteres",
      "string.pattern.base":
        "O campo TELEFONE precisa ter um formato válido. Ex: (71)99993-5306 ou 61 99999-9999",
    })
    .required(),
  cep: joi.string().max(9).pattern(new RegExp("[0-9]{5}-[0-9]{3}")).messages({
    "string.pattern.base":
      "O campo CEP precisa ter um formato válido. Ex: 30110-002",
    "string.max": "O campo CEP deve ter no máximo 9 caracteres",
  })
    .optional()
    .allow(''),
  logradouro: joi.string().optional().allow(""),
  complemento: joi.string().optional().allow(""),
  bairro: joi.string().optional().allow(""),
  cidade: joi.string().optional().allow(""),
  estado: joi.string().optional().allow(""),
});

module.exports = schemaClient;
