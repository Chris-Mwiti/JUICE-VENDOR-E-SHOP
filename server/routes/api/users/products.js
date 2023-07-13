const verifyJwt = require("../../../middlewares/verifyJwt");
const ProductController = require("../../../controllers/productController");

const router = require("express").Router();

router.use(verifyJwt)
router.route("/").get(async (req, res) => {
  const productController = new ProductController(req, res);
  await productController.getProducts();
});

// API ROUTES WITH APIS
router.route("/:productId").get(async (req, res) => {
  const productController = new ProductController(req, res);
  await productController.getProduct();
});

module.exports = router;
