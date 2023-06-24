const {logger} = require('./logger');

const errHandler = (err,req,res,next) => {
    if(res.headersSent){
        return next(err)
    }
    logger(`${err.name}\t${err.message}\n`,'errLog.txt');
    console.error(err.stack);
    res.status(500).json({messgae: "Please try again later"});
}

module.exports = errHandler