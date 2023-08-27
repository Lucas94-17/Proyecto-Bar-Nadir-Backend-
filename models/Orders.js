const mongoose = require("mongoose")

const { model, Schema } = mongoose


const orderSchema = new Schema({
	datos: {
		type: Object,
		required: true,
	},
    items: {
		type: Object,
		required: true,
	},
	detalles: {
		type: Object,
	},	
	cantidad: {
		type: Object,	
	},
	total: {
		type: Number,
		required: true,
    },
	estado:{
		type:String,
		required : true,
		enum : ["En espera","En proceso","Terminado", "Enviado"]
	}
},{versionKey:false})


orderSchema.index({ datos: "text", items: "text", detalles:"text", cantidad:"text", total: "text", estado: "text"})


module.exports = model("Orders", orderSchema)