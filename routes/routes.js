const express = require ("express")
//aca definimos router 
const router = express.Router()


//      Middlewares : 

const { verifyToken } = require("../middlewares/verifyToken");
const { verifyIsAdmin } = require("../middlewares/VerifyIsAdmin")


// aca se importa las funciones declaradas en los controladores de User

//       Usuario!

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
router.delete("/delete-user/:id", validateDelete, deleteUser)
router.put("/update-user", updateUser)//peticion get para el paginado al leer los usuarios
router.get(
	"/read-users-paginated",
	validateGetWithQueryStrings,
	readUsers
)

router.get("/read-users", verifyToken, verifyIsAdmin, readUsers)
router.get("/read-user/:id", verifyToken, readUser)

router.post("/login" ,login)


//      Food !!

const {
        readFoods,
        createFood,
        deleteFood,
        updateFood,
        searchFoods,
} = require("../controllers/Foods")

const {
    validateCreateFood
} = require("../middlewares/validators/food")


//Leer la comida que hay en la base de datos
router.get("/read-foods", readFoods)

router.post(
	"/create-food",
	validateCreateFood,
	verifyToken,
	verifyIsAdmin,
	createFood
)

router.get("/search-Food", searchFoods)

router.delete(
	"/delete-Food/:id",
	verifyToken,
	verifyIsAdmin,
	deleteFood
)
router.put("/update-Food", verifyToken, verifyIsAdmin, updateFood)

module.exports = router