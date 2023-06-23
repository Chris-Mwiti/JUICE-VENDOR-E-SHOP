import axios from 'axios';

class OrderController{
    constructor(orderDetails){
        this.orderDetails = orderDetails,
        this.source = axios.CancelToken.source()
        this.BASE_URL = axios.create({
            baseURL: 'http://localhost:1100',
            timeout: 1500
        })
    }

    async postOrderDetails(){
        try{
            const response =  await this.BASE_URL.post('/orderDetails',this.orderDetails,{cancelToken: this.source.token})
            return response
        }
        catch(err){
            console.error(err)
        }
    }

    async postPaymentType(){
        try{
            const response = await this.BASE_URL.post('/paymentType', {paymentType: this.orderDetails.paymentType},{cancelToken: this.source.token}).finally(() => {
                this.source.cancel()
            })
            return response
        }catch(err){
            console.error(err)
        }
    }

    async postShippingDetails(){
        try{
            const response = await this.BASE_URL.post('/shippingDetails', {shippingDetails: this.orderDetails.shippingDetails},{cancelToken: this.source.token}).finally(() => {
                this.source.cancel()
            })
            return response
        }catch(err){
            console.error(err)
        }
    }
}

export default OrderController