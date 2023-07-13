const router = require("express").Router();

const verifyJwt = require("../../../middlewares/verifyJwt");
// Controllers
const InventoryController = require("../../../controllers/inventoryController");

router.use(verifyJwt);
// COMMON ROUTES API
router.route("/").get(async (req, res) => {
  const inventoryController = new InventoryController(req, res);
  await inventoryController.getItems();
});
module.exports = router;
