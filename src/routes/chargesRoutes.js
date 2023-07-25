const express = require("express");
const {
  registerCharges,
  getAllCharges,
  editCharges,
  deleteCharges,
  orderCharges,
} = require("../controllers/ChargesController");
const validateEmptyFields = require("../middleware/emptyFields");
const schemaCharges = require("../utils/chargesValidate");
const auth = require("../middleware/auth");
const router = express.Router();

router.use(auth);
router.post("/charges", validateEmptyFields(schemaCharges), registerCharges);
router.get("/charges", getAllCharges);
router.put("/charges", editCharges);
router.delete("/charges", deleteCharges);
router.get("/charges/:cliente_id", orderCharges);

module.exports = router;
