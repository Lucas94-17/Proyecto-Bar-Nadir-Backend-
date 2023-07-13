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

const {login,register} = require("../controllers/Auth")

router.get("/read-users",readUsers)

module.exports = router