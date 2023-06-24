// Dependancies
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const { format } = require('date-fns');
const { randomUUID } = require('crypto');

const logger = async(message,fileName) => {
    const dateTime  = `${format(new Date(), 'yyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t ${randomUUID()}\t${message}\n`

    try{
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs',  fileName), logItem);
    }
    catch(err){
       console.error(err)
    }
}

const logEvents = (req,res,next) => {
    logger(`${req.method}\t${req.headers.origin}\t${req.url}`, 'req.txt');
    next()
}

module.exports = {logger,logEvents};