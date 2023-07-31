const mongoose = require("mongoose")

const { model, Schema } = mongoose

const userSchema = new Schema({
	id: String,
	email: {
		type: String,
		required: true,
		unique: true,
	},
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ["admin", "client"],
		required: true,
	},
},{versionKey:false})

module.exports = model("Users", userSchema)