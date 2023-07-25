const knex = require("../config/database/database");

const registerClients = async (req, res) => {
  const {
    nome,
    email,
    cpf,
    telefone,
    cep,
    logradouro,
    complemento,
    bairro,
    cidade,
    estado,
  } = req.body;
  const { user } = req;
  try {
    const validEmailClient = await knex("clients").where({ email }).first();
    const validEmailUser = await knex("users").where({ email }).first();
    const validCpf = await knex("clients").where({ cpf }).first();
    const validTelefone = await knex("clients").where({ telefone }).first();
    if (validEmailClient) {
      return res.status(400).json({ mensagem: "E-mail inválido" });
    }
    if (validEmailUser) {
      return res.status(400).json({ mensagem: "E-mail inválido" });
    }
    if (validCpf) {
      return res.status(400).json({ mensagem: "CPF inválido" });
    }
    if (validTelefone) {
      return res.status(400).json({ mensagem: "Número de telefone inválido" });
    }
    await knex("clients").insert({
      nome,
      email,
      cpf,
      telefone,
      cep,
      logradouro,
      complemento,
      bairro,
      cidade,
      estado,
      id_usuario: user,
    });
    return res.status(201).json({ mensagem: "Cliente Cadastrado" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getAllClients = async (req, res) => {
  try {
    const response = await knex.raw(`select *, (
      select count(*)
      from charges
      where status = 'vencida'
      and charges.cliente_id = clients.id
      limit 1 ) as counterStatus from clients `)
    return res.status(200).json(response.rows);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getClient = async (req, res) => {
  const { id } = req.query;
  try {
    const response = await knex("clients").where("id", id).select("*");
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const editClient = async (req, res) => {
  const {
    nome,
    email,
    cpf,
    telefone,
    cep,
    logradouro,
    complemento,
    bairro,
    cidade,
    estado,
    id_cliente
  } = req.body;
  const { user } = req;
  const validEmail = await knex("users")
    .where({ email })
    .andWhere("id", "<>", user)
    .first();
  if (validEmail) {
    return res.status(400).json({ mensagem: "E-mail inválido" });
  }
  const validCpf = await knex("users")
    .where({ cpf })
    .andWhere("id", "<>", user)
    .first();
  if (validCpf) {
    return res.status(400).json({ mensagem: "CPF inválido" });
  }
  try {
    const response = await knex("clients").where({ id: id_cliente }).andWhere('id_usuario', user).update({
      nome,
      email,
      cpf,
      telefone,
      cep,
      logradouro,
      complemento,
      bairro,
      cidade,
      estado,
    }).returning('*');

    if (response.length === 0) {
      return res.status(401).json({ mensagem: "Você não tem autorização para editar este cliente" })
    }
    return res.status(204).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { registerClients, getAllClients, getClient, editClient };
