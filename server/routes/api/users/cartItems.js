// DEPENDANCIES
const CartItemsController = require("../../../controllers/cartItemsController");
const verifyJwt = require("../../../middlewares/verifyJwt");
const verifySessionId = require("../../../middlewares/verifySessionId");

const router = require("express").Router();

// MIDDLEWARES
router.use(verifyJwt);
router.use(verifySessionId);

router
  .route("/")
  .get(async (req, res) => {
    const cartController = new CartItemsController(req, res);
    await cartController.getCartItems();
  })
  .post(async (req, res) => {
    const cartController = new CartItemsController(req, res);
    await cartController.addCartItem();
  })
  .delete(async (req, res) => {
    const cartController = new CartItemsController(req, res);
    await cartController.deleteAllCartItems();
  });

// API ROUTES REQUIRING PARAMS:
router
  .route("/:itemId")
  .get(async (req, res) => {
    const cartController = new CartItemsController(req, res);
    await cartController.getCartItem();
  })
  .put(async (req, res) => {
    const cartController = new CartItemsController(req, res);
    await cartController.updateCartItem();
  })
  .delete(async (req, res) => {
    const cartController = new CartItemsController(req, res);
    await cartController.deleteCartItem();
  });

module.exports = router;
