const { Knex } = require("knex");
const knex = require("../config/database/database");

const registerCharges = async (req, res) => {
  const { cliente_id, nome, descricao, vencimento, valor, status } = req.body;
  let statusCharges = status;
  const dueDateArray = vencimento.split("-");
  const reverse = dueDateArray.reverse();
  const stringDueDate = reverse.join("/");
  var strData = stringDueDate;
  var partesData = strData.split("/");
  var data = new Date(partesData[2], partesData[1] - 1, partesData[0]);
  if (!cliente_id || !descricao || !vencimento || !valor || !status) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios" });
  }
  if (status == "pendente") {
    if (data < new Date()) {
      statusCharges = "vencida";
    }
  }
  try {
    const response = await knex("charges").insert({
      cliente_id,
      nome,
      descricao,
      vencimento,
      valor,
      status: statusCharges,
    });
    return res.status(201).json({ mensagem: "Cobrança cadastrada" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getAllCharges = async (req, res) => {
  try {
    const date = new Date();
    const response = await knex
      .select(
        "c.id",
        "u.id as id_cliente",
        "u.nome as nome_cliente",
        "c.descricao",
        "c.vencimento",
        "c.valor",
        "c.status",
      )
      .from("charges as c")
      .leftJoin("clients as u", "u.id", "c.cliente_id");
    response.map(async (item) => {
      if (item.status == "pendente" && new Date(item.vencimento) < date) {
        await knex("charges")
          .update({
            status: "vencida",
          })
          .where("id", item.id);
      }
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const editCharges = async (req, res) => {
  const { cliente_id, charge_id, nome, descricao, vencimento, valor, status } =
    req.body;
  if (!cliente_id || !descricao || !vencimento || !valor || !status) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios" });
  }
  try {
    const response = await knex("charges")
      .update({
        nome,
        descricao,
        vencimento,
        valor,
        status,
      })
      .where("id", charge_id)
      .andWhere("cliente_id", cliente_id)
      .returning("*");
    if (response === 0) {
      return res
        .status(401)
        .json({
          mensagem: "Você não tem autorização para editar está cobrança",
        });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteCharges = async (req, res) => {
  const { cliente_id, charge_id, status } = req.body;
  if (status == "pago" || status == "vencida") {
    return res
      .status(400)
      .json({ mensagem: "Esta cobrança não pode ser excluida" });
  }
  try {
    const response = await knex("charges")
      .del()
      .where("id", charge_id)
      .andWhere("cliente_id", cliente_id);
    return res.status(200).json({ mensagem: "Cobrança excluida com sucesso!" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const orderCharges = async (req, res) => {
  const { cliente_id } = req.params; //
  try {
    const response = await knex
      .select("*")
      .table("charges")
      .orderBy("id", "desc");
    return res.json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  registerCharges,
  getAllCharges,
  editCharges,
  deleteCharges,
  orderCharges,
};
