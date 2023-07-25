const express = require("express");
const { registerClients, getAllClients, getClient, editClient } = require("../controllers/ClientController");
const validateEmptyFields = require("../middleware/emptyFields");
const schemaClient = require("../utils/clientValidate");
const schemaClientUpdate = require('../utils/updateClientValidate')
const auth = require("../middleware/auth");
const router = express.Router();

router.use(auth);
router.post("/clients", validateEmptyFields(schemaClient), registerClients);
router.get("/clients", getAllClients);
router.get('/detail', getClient); // query ?id=
router.put('/clients', validateEmptyFields(schemaClientUpdate), editClient);
module.exports = router;
