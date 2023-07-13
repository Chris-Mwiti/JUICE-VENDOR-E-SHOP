const CategoriesController = require('../../../controllers/categoriesController');

const router = require('express').Router();

// COMMON API ROUTES
router.route('/')
    .get(async(req, res) => {
        const categoriesController = new CategoriesController(req,res);
        await categoriesController.getCategories();
    })

module.exports = router