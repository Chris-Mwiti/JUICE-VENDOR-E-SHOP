const UserController = require('../controllers/userController');

const router = require('express').Router();

router.route('/')
    .post(async (req,res,next) => {
        const userController = new UserController(req,res);
        await userController.logInUser();
    })
router.get('/check-user', async(req,res) => {
    const userController = new UserController(req,res);
    await userController.checkUser(); 
})
module.exports = router