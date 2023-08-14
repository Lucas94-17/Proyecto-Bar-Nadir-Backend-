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
async function updateOrderStatusToProcess(req, res) {
    const orderId = req.params.id;
  
    try {
      const updatedOrder = await OrdersModel.findByIdAndUpdate(
        orderId,
        { estado: "En proceso" },
        { new: true }
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async function updateOrderStatusToFinished(req, res) {
    const orderId = req.params.id;
  
    try {
      const updatedOrder = await OrdersModel.findByIdAndUpdate(
        orderId,
        { estado: "Terminado" },
        { new: true }
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async function updateOrderStatusToSend(req, res) {
    const orderId = req.params.id;
  
    try {
      const updatedOrder = await OrdersModel.findByIdAndUpdate(
        orderId,
        { estado: "Enviado" },
        { new: true }
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
  

module.exports = {
    createorder,
    readOrders,
    updateOrderStatusToProcess,
    updateOrderStatusToFinished,
    updateOrderStatusToSend,
}
