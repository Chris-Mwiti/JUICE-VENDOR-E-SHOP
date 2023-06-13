import axios from "axios";

export default class DiscountController{
    constructor(){

    }
    async getDiscountCodes(){
        try{
            const codes = await axios.get('http://localhost:1100/discountCodes')
            console.log(codes.data)
            return codes.data
        }
        catch(error){
            console.error(error.message)
        }
    }
}