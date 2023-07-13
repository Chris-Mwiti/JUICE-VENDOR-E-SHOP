const verifyJwt = require("../../../middlewares/verifyJwt");
const ShoppingSessionController = require("../../../controllers/shoppingSession");

const router = require("express").Router();

// COMMON ROUTES
router.use(verifyJwt);
router
  .route("/")
  .get(async (req, res) => {
    const shoppingController = new ShoppingSessionController(req, res);
    await shoppingController.getSession();
  })
  .post(async (req, res) => {
    const shoppingController = new ShoppingSessionController(req, res);
    await shoppingController.createSession();
  })
  .put(async (req, res) => {
    const shoppingController = new ShoppingSessionController(req, res);
    await shoppingController.updateSessionStatus();
  });

module.exports = router;
