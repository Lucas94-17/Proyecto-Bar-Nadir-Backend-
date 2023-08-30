const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mercadopago = require("mercadopago");

const bodyParser = require('body-parser');

dotenv.config()

require("./database/database")

const routes = require("./routes/routes")

const app = express()

app.use(bodyParser.json());


app.use(cors())
app.use(express.json())

app.use("/api",routes)

app.post("/create_preference", (req, res) => {

	let preference = {
		items: [
			{
				title: req.body.titulo,
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
			}
		],
		back_urls: {
			"success": "http://localhost:5173/carrito",
			"failure": "http://localhost:5173/carrito",
			"pending": ""
		},
		"auto_return": "approved",	
	};
	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({
				id: response.body.id
			});
		}).catch(function (error) {
			console.log(error);
		});
});



app.listen(process.env.PORT , () =>
    console.log("Nuestro servidor está escucnado en el PORT " + process.env.PORT)
)