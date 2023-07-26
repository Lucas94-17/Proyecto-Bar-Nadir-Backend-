const bcrypt = require("bcrypt")
const uuid = require("uuid")
const jwt = require("jsonwebtoken")

const MenuModel = require("../models/Menu")
const UserModel = require("../models/User")
const { text } = require("express")

async function readMenues(_, res) {
	try {
		await MenuModel.find().then(response =>
			res.status(200).json(response)
		)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

async function readMenu(req, res) {
	const { id } = req.params

	try {
		await MenuModel.findOne({ id }).then(response =>
			res.status(200).json(response)
		)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

async function createMenu(req, res) {
	const { title, img, detail, precio, categoria } = req.body

	const data = new MenuModel({
		id: uuid.v4(),
		title,
		img,
		detail,
		precio,
		categoria,
	})

	data.save()
	res.status(201).json({
		success: true,
		data: req.body,
	})
}

async function deleteMenu(req, res) {
	const { id } = req.params

	try {
		MenuModel.deleteOne({ id }).then(response => {
			if (response.deletedCount) {
				res.status(200).json({
					message: `El curso con ${id} fue borrado exitosamente.`,
				})
			} else {
				res.status(200).json({
					message: `No se ha encontrado el curso: ${id}`,
				})
			}
		})
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

async function updateMenu(req, res) {
	const { id_menu, modify } = req.body

	try {
		MenuModel.findOneAndUpdate({ id: id_menu }, modify).then(
			response => {
				if (response.id) {
					res.status(200).json({
						message: `El menu con id ${response.id} fue editado exitosamente.`,
						data: res.body,
					})
				} else {
					res.status(200).json({
						message: `No se ha encontrado el menu.`,
					})
				}
			}
		)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

async function searchMenues(req, res) {
	const { q } = req.query

	try {
		await MenuModel.find(
			{
				$text: { $search: q },
			},
			{ score: { $meta: "textScore" } }
		)
			.sort({
				score: { $meta: "textScore" },
			})
			.then(response => {
				res.status(200).json({ data: response })
			})
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

module.exports = {
	createMenu,
	deleteMenu,
	readMenu,
	readMenues,
	searchMenues,
	updateMenu,
}