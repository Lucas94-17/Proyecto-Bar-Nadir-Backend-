const OrdersModel = require("../models/Orders")
const uuid = require("uuid")

async function createorder  (req,res) {
    try{
        const {total,datos,items} =req.body 

        const data = new OrdersModel({
			id : uuid.v4(),
            datos,
            items,
            total,
            estado:"En espera",

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

async function updateOrders(req, res) {
	const { id_order, modify } = req.body

	try {
		OrdersModel.findOneAndUpdate({ id: id_order }, modify).then(
			response => {
				if (response.id) {
					res.status(200).json({
						message: `La orden con id ${response.id} fue editado exitosamente.`,
						data: res.body,
					})
				} else {
					res.status(200).json({
						message: `No se ha encontrado la orden.`,
					})
				}
			}
		)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

module.exports = {
    createorder,
    readOrders,
	updateOrders,
}
