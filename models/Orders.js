const mongoose = require("mongoose")

const { model, Schema } = mongoose


const menuSchema = new Schema({
	datos: {
		type: String,
		required: true,
	},
    items: {
		type: String,
		required: true,
	},
	total: {
		type: Number,
		required: true,
    }
},{versionKey:false})


menuSchema.index({ title: "text", detail: "text" })


module.exports = model("Orders", menuSchema)