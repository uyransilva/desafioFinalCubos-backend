const knex = require("../config/database/database");
const jwt = require("jsonwebtoken");
const passJWT = process.env.SENHA_JWT;

const loginVerify = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ mensagem: "Não Autorizado" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, passJWT);

    const userLogin = await knex("users").where({ id }).first();

    req.user = userLogin.id;

    next();
  } catch (error) {
    return res.status(401).json({ mensagem: "Não autorizado" });
  }
};

module.exports = loginVerify;
