const CategoriesController = require('../controllers/categoriesController');

const router = require('express').Router();

// COMMON API ROUTES
router.route('/')
    .get(async(req, res) => {
        const categoriesController = new CategoriesController(req,res);
        await categoriesController.getCategories();
    })
    .post(async(req,res) => {
        const categoriesController = new CategoriesController(req,res);
        await categoriesController.addCategory();
    })

// API ROUTES WITH PARAMS
router.route('/:categoryName')
    .put(async(req,res) => {
        const categoriesController = new CategoriesController(req,res);
        await categoriesController.updateCategory()
    })
    .delete(async(req,res) => {
        const categoriesController = new CategoriesController(req,res);
        await categoriesController.deleteCategory()
    })
    .get(async (req,res) => {
        const categoriesController = new CategoriesController(req,res);
        await categoriesController.getCategory()
    })


module.exports = router    