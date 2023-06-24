import axios from 'axios'

class RegistrationController{
    constructor(data,id){
        this.data = data
        this.id = id
        this.source = axios.CancelToken.source()
        this.BASE_URL = axios.create({
            baseURL: 'http://localhost:5000',
            timeout: 1500
        })
    }

    async addNewUser(){
        try{
            const response = await axios.post('http://localhost:5000/register',this.data,{cancelToken: this.source.token,withCredentials: true}).finally(() =>{
            this.source.cancel()
        })
        return response.status
        } catch (error) {
            console.error(error)
        }
    }

    async getUser(){
        try {
            const user = await axios.get(`http://localhost:1100/users/${this.id}`,{cancelToken: this.source.token,withCredentials: true}).finally(() => {
            this.source.cancel()
            return user.data
        })
        } catch (error) {
            console.error(error)
        }
    }

    async logInUser(){
        try{
            const response = await this.BASE_URL.post('/log-in',this.data,{withCredentials: true})
            console.log(response)
            return response
        }
        catch(error){
            console.error(error)
        }
    }

    async checkUser(){
        try{
            const response = await this.BASE_URL.get('/log-in/check-user',{withCredentials: true, cancelToken: this.source.token}).finally(() => {
                this.source.cancel()
            })
            return response
        }
        catch(err){
            console.error(err)
        }
    }
}

export default RegistrationController