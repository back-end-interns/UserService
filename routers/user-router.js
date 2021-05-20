const express = require("express");

const router = express.Router();

//refer to controller
const controller = require("../controllers/user-controller");

//Create data
router.post("/create", controller.createUser)

//Retrieve data
router.get("/", controller.getData)

//Update
router.put("/update", controller.updateUser)

//Delete
router.delete("/delete", controller.deleteUser)

//exports router
module.exports = router