class ResponseHandlers{
    constructor(data,response){
        this.data = data,
        this.res = response
    }

    postResponse(){
        switch(this.data){
            case undefined:
               return this.res.status(500).json({message: "Server side error"});
            default:
                this.res.status(202).json({message: "Created"});
        }
    }

    getResponse(){
        switch(this.data){
            case undefined:
                return this.res.status(500).json({message: "Server side error"});
            case null:
                return this.res.status(400).json({message: "Bad Request"});
            default:
                this.res.status(200).json({message: "Ok", data: this.data})
        }
    }

    updatesResponse(){
        switch(this.data){
            case undefined:
                return this.res.status(500).json({message: "Server side error"});
            case null:
                return this.res.status(400).json({message: "Bad Request"});
            default:
                this.res.status(200).json({message: "Ok", data: this.data})
        }
    }

    deleteResponse(){
        switch(this.data){
            case undefined:
                return this.res.status(500).json({message: "Server side error"});
            case null:
                return this.res.status(400).json({message: "Bad Request"});
            default:
                this.res.status(200).json({message: "Ok"})
        }
    }
}

module.exports = ResponseHandlers