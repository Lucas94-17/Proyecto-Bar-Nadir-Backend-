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
async function readOrders(_, res) {
	try {
		await OrdersModel.find().then(response =>
			res.status(200).json(response)
		)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

module.exports = {
    createorder,
    readOrders,
}
