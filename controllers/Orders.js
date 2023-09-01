const OrdersModel = require("../models/Orders")
const uuid = require("uuid")

async function createorder  (req,res) {
    try{
        const {total,datos,items,detalles,cantidad} =req.body 

        const data = new OrdersModel({
			      id : uuid.v4(),
            datos,
            items,
            detalles,
            cantidad,
            total,
            estado:"En espera",

        })
        await data.save()

        res.status(201).json({
            id: data.id, 
            estado: data.estado,
          });
    }   catch (error){
        res.status(400).json({
          message: "Error al crear la orden",
          error: error.message
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
  const deleteAllOrders = async (req, res) => {
	try {
		await OrdersModel.deleteMany({ estado: "Enviado" });

		res.status(200).json({ message: "Todas las órdenes enviadas han sido eliminadas" });
	} catch (error) {
		res.status(500).json({ message: "Error al eliminar las órdenes", error: error.message });
	}
};
  
  

module.exports = {
    createorder,
    readOrders,
    updateOrders,
    updateOrderStatusToProcess,
    updateOrderStatusToFinished,
    updateOrderStatusToSend,
    deleteAllOrders,
}
