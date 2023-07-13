const AdminController = require('../../../controllers/adminController');

const router = require('express').Router();

router.route('/')
    .post(async (req,res,next) => {
        const adminController = new AdminController(req,res);
        await adminController.logInUser();
    })
router.get('/check-user', async(req,res) => {
    const adminController = new AdminController(req,res);
    await adminController.checkUser(); 
})
module.exports = router