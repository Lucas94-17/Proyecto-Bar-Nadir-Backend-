const mongoose = require("mongoose")

const { model, Schema } = mongoose

//! Creamos la estructura de un tipo de documento (courses)
const menuSchema = new Schema({
	id: String,
	title: {
		type: String,
		required: true,
	},
	precio: {
		type: Number,
		required: true,
	},
	categoria: {
		type: String,
		required: true,
	},
	detail: {
		type: String,
		required: true,
	},
	img: {
		type: String,
		required: true,
	}
})

//! Esto es necesario para que mongo indexe los campos que permiten busqueda x texto
menuSchema.index({ title: "text", detail: "text", precio: "text", categoria: "text" })

//! Como primer parametro, va el nombre de la coleccion
module.exports = model("Menues", menuSchema)
