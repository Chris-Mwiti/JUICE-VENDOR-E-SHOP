const UserController = require('../controllers/userController');

const router = require('express').Router();

router.route('/')
    .post(async (req,res,next) => {
        const userController = new UserController()
        const logInResponse = await userController.logInUser(req.body);
        // @TODO: Error handling
        console.log(logInResponse);
        if(logInResponse == 400){
            res.status(400);
        }
        else if(logInResponse == 401){
            res.status(401);
        }
        else if(logInResponse == 500){
            res.status(500);
        }
        else{
            res.cookie('refresh_cookie',logInResponse.refresh_token,{ httpOnly: true, maxAge: 24 * 60 * 60 * 100});
            res.cookie('access_token', logInResponse.access_token,{httpOnly: true, maxAge: 15 * 60 * 100});
            res.status(202).json({message: "Success"})
        }
    })
router.post('/check-user', async(req,res) => {
    const userController = new UserController()
    const checkResponse = await userController.checkUser(req);
})
module.exports = router