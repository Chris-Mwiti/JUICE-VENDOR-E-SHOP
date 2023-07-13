const OrderDetailsController = require("../../../controllers/orderDetailsController");
const verifyJwt = require("../../../middlewares/verifyJwt");

const router = require("express").Router();

router.use(verifyJwt);

router.route("/").post(async (req, res) => {
  const ordersController = new OrderDetailsController(req, res);
  await ordersController.createOrder();
});

module.exports = router;
