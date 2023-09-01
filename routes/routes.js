const express = require("express")

const {
	validateCreate,
	validateDelete,
	validateGetWithQueryStrings,
} = require("../middlewares/validators/user")

const {
	validateCreateMenu,
} = require("../middlewares/validators/menu")

const {
	deleteUser,
	readUser,
	readUsers,
	updateUser,
} = require("../controllers/User")

const { login, register } = require("../controllers/Auth")

const {
	readMenu,
	readMenues,
	createMenu,
	deleteMenu,
	searchMenues,
	updateMenu,
} = require("../controllers/Menu")

const { verifyToken } = require("../middlewares/verifyToken")
const { verifyIsAdmin } = require("../middlewares/VerifyIsAdmin")

const router = express.Router()


const {
	createorder,
	readOrders,
	updateOrderStatusToProcess,
	updateOrderStatusToFinished,
	updateOrderStatusToSend,
	deleteAllOrders,
  } = require("../controllers/Orders");

router.get("/read-Orders", readOrders);
router.post("/create-Orders", createorder);
router.put("/update-order-status/:id/accept", updateOrderStatusToProcess);
router.put("/update-order-status/:id/finish", updateOrderStatusToFinished);
router.put("/update-order-status/:id/send", updateOrderStatusToSend);  
router.delete("/delete-all-orders", deleteAllOrders);



router.get("/read-foods", readMenu)
router.post("/create-user", validateCreate, register)

router.delete("/delete-user/:id", validateDelete, deleteUser)
router.put("/update-user", updateUser)

router.get(
	"/read-users-paginated",
	validateGetWithQueryStrings,
	readUsers
)

router.get("/read-users", readUsers)
router.get("/read-user/:id", verifyToken, readUser)

router.post("/login", login)

router.get("/read-menues", readMenues)

router.get("/read-menu/:id", readMenu)

router.post(
	"/create-menu",
	validateCreateMenu,
	verifyToken,
	verifyIsAdmin,
	createMenu
)

router.get("/search-menues", searchMenues)

router.delete(
	"/delete-menu/:id",
	verifyToken,
	verifyIsAdmin,
	deleteMenu
)
router.put("/update-menu", verifyToken, verifyIsAdmin, updateMenu)



module.exports = router