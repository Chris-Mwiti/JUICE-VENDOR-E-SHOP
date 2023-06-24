const UserController = require('../controllers/userController');

const router = require('express').Router();

router.route('/')
    .post(async (req,res,next) => {
        const userController = new UserController()
        const logInResponse = await userController.logInUser(req.body);
        
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
            res.cookie('refresh_token',logInResponse.refresh_token,{ httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
            res.cookie('access_token', logInResponse.access_token,{httpOnly: true, maxAge: 15 * 60 * 1000});
            res.status(202).json({message: "Success"})
        }
    })
router.get('/check-user', async(req,res) => {
    const userController = new UserController()
    const checkResponse = await userController.checkUser(req);
    switch(checkResponse){
        case 401:
            res.status(401).json({message: "Unauthorized"})
            break
        case 403:
            res.status(403).json({message: "Forbiden"})
            break
        case 500:
            res.status(500).json({message: "Server error"})
            break
        case 200:
            res.status(200).json({message: "Ok"})
            break
        default:
            res.cookie("access_token", checkResponse.accessToken,{httpOnly: true, maxAge: 15 * 60 * 1000})
            res.status(200).json({message: "Successful"})

    }
})
module.exports = router