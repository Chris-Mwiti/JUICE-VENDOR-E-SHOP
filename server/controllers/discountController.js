// Models 
const Discount = require('../models/discounts');

// Response Handlers
const ResponseHandlers = require('../helpers/modelResponseHandlers')

class DiscountController{
    constructor(req,res){
        this.req = req,
        this.res = res,
        this.discountModel = new Discount(req.body.coupon,req.body.percentage),
        this.coupon = req.params.coupon
    }

    async addDiscount(){
        const response = await this.discountModel.addDiscount();
        new ResponseHandlers(response,this.res).postResponse();
    }

    async getDiscounts(){
        const discounts = await this.discountModel.getDiscounts();
        new ResponseHandlers(discounts,this.res).getResponse();
    }

    async getDiscount(){
        const discount = await this.discountModel.getDiscount(this.coupon);
        new ResponseHandlers(discount,this.res).getResponse()
    }

    async deleteDiscount(){
        const response = await this.discountModel.deleteDiscount(this.coupon);
        new ResponseHandlers(response,this.res).deleteResponse();
    }

    async updateDiscount(){
        const response = await this.discountModel.updateDiscount(this.coupon);
        new ResponseHandlers(response,this.res).updatesResponse();
    }
}

module.exports = DiscountController