const express = require("express");

const users = require("./usersRoutes");

const clients = require("./clientsRoutes");

const charges = require('./chargesRoutes')

const router = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ message: "Api modulo 5" });
  });
  app.use(express.json(), users, clients, charges);
};

module.exports = router;
