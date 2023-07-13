const router = require("express").Router();

// Controllers
const DiscountController = require("../../../controllers/discountController");

// COMMON ROUTES WITH APU
router
  .route("/")
  .get(async (req, res) => {
    const discountController = new DiscountController(req, res);
    await discountController.getDiscounts();
  })
  .post(async (req, res) => {
    const discountController = new DiscountController(req, res);
    await discountController.addDiscount();
  });

// API ROUTES WITH API
router
  .route("/:coupon")
  .get(async (req, res) => {
    const discountController = new DiscountController(req, res);
    await discountController.getDiscount();
  })
  .put(async (req, res) => {
    const discountController = new DiscountController(req, res);
    await discountController.updateDiscount();
  })
  .delete(async (req, res) => {
    const discountController = new DiscountController(req, res);
    await discountController.deleteDiscount();
  });

module.exports = router;
