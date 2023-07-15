const express = require ("express")
//aca definimos router 
const router = express.Router()
// aca se importa las funciones declaradas en los controladores de User
const {
    deleteUser,
    readUser,
    readUsers,
    updateUser,
} = require("../controllers/User")

const {
	validateCreate,
	validateDelete,
	validateGetWithQueryStrings,
} = require("../middlewares/validators/user")

const {login,register} = require("../controllers/Auth")

router.get("/read-users",readUsers)

router.post("/create-user",validateCreate,register)


router.post("/login" ,login)
module.exports = router