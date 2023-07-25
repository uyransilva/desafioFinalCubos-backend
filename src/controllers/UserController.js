const knex = require("../config/database/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUsers = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const validEmail = await knex("users").where({ email }).first();
    if (validEmail) {
      return res.status(400).json({ mensagem: "E-mail inválido para cadastro" });
    }
    const validEmailClients = await knex("clients").where({ email }).first();
    if (validEmailClients) {
      return res.status(400).json({ mensagem: "E-mail inválido para cadastro" });
    }
    const encryptedPass = await bcrypt.hash(senha, 10);
    await knex("users").insert({
      nome,
      email,
      senha: encryptedPass,
    });
    return res.status(201).json({ mensagem: "Usuario Cadastrado" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const validUser = await knex("users").where({ email }).first();
    if (!validUser) {
      return res.status(404).json({ mensagem: "senha ou email não conferem" });
    }
    const validPassword = await bcrypt.compare(senha, validUser.senha);
    if (!validPassword) {
      return res.status(404).json({ mensagem: "senha ou email não conferem" });
    }
    const token = jwt.sign(
      { id: validUser.id, nome: validUser.nome, email: validUser.email },
      process.env.SENHA_JWT,
      { expiresIn: "2h" },
    );
    const { senha: _, ...userData } = validUser;
    return res.status(200).json({ userData, token });
  } catch (error) {
    return res.status(500).json({ message: "ok" });
  }
};

const updateUser = async (req, res) => {
  const { nome, email, senha, cpf, telefone } = req.body;
  const { user } = req;
  const validEmail = await knex("users")
    .where({ email })
    .andWhere("id", "<>", user)
    .first();
  if (validEmail) {
    return res
      .status(400)
      .json({ mensagem: "E-mail inválido" });
  }
  const validCpf = await knex("users")
    .where({ cpf })
    .andWhere("id", "<>", user)
    .first();
  if (validCpf) {
    return res
      .status(400)
      .json({ mensagem: "CPF inválido" });
  }
  try {
    const encryptedPass = await bcrypt.hash(senha, 10);
    const response = await knex("users").where({ id: req.user }).update({
      nome,
      email,
      senha: encryptedPass,
      cpf,
      telefone,
    }).returning('*')
    const { senha: _, ...userData } = response[0];
    return res.status(204).json(userData);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const userData = async (req, res) => {
  const { user } = req
  try {
    const users = await knex("users").select('id', ' nome', ' email', 'cpf', 'telefone').where({ id: user })

    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

module.exports = { registerUsers, login, updateUser, userData };
