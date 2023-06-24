const {logger} = require('../middlewares/logger');

const prismaErrHandler = (err) => {
    let errStatus = {
        code: 200,
        message: err.message
    } 
    // Check if the error is a PrismaClientExpectetionError
    switch(err.code){
        case 'P2001':return errStatus.code = 400
        case 'P2025': return errStatus.code = 400
        default:
            errStatus.code = err.code
        }
    logger(`${errStatus.code}\t${errStatus.message}\n`, 'prismaErrLog.txt');
    throw err
}

module.exports = prismaErrHandler