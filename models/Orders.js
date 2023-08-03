const mongoose = require("mongoose")

const { model, Schema } = mongoose


const menuSchema = new Schema({
	datos: {
		type: Object,
		required: true,
	},
    items: {
		type: Object,
		required: true,
	},
	total: {
		type: Number,
		required: true,
    }
})


menuSchema.index({ title: "text", detail: "text" })


module.exports = model("Orders", menuSchema)