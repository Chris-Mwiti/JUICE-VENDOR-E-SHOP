const whiteListServers = ['http://localhost:5173','http://localhost:5000'];

const corsConfig = {
    origin: (origin,callback) => {
        if(whiteListServers.indexOf(origin) !== -1 || !origin){
           return callback(null,true)
        }
        else{
            callback(new Error("Not allowed by cors"))
        }
    },
    optionSuccessStatus:200,
    credentials: true
}

module.exports = corsConfig