const DiscountController = require('../../../controllers/discountController');

const router = require('express').Router()

router
  .route("/:coupon")
  .get(async (req, res) => {
    const discountController = new DiscountController(req, res);
    await discountController.getDiscount();
  })

module.exports = router