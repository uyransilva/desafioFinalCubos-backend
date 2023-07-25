const express = require("express");
const {
  registerUsers,
  login,
  updateUser,
  userData
} = require("../controllers/UserController");
const validateEmptyFields = require("../middleware/emptyFields");
const auth = require("../middleware/auth");
const schemaUser = require("../utils/userValidate");
const schemaLogin = require("../utils/loginValidate");
const schemaUpdate = require('../utils/updateValidate')
const router = express.Router();

router
  .post("/usuarios", validateEmptyFields(schemaUser), registerUsers)
  .post("/login", validateEmptyFields(schemaLogin), login)
  .put("/usuarios", validateEmptyFields(schemaUpdate), auth, updateUser)
  .get("/usuarios", auth, userData);

module.exports = router;
