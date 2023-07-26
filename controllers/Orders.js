const OrdersModel = require("../models/Orders")

async function createorder  (req,res) {
    try{
        const {total,datos,item} =req.body 

        const data = new OrdersModel({
            total,
            datos,
            item,

        })
        data.save()
        res.status(201).json({create : true})
    }catch(error){
        res.status(400).json({
            message : error.message
        })
    }
}