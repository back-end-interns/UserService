const express = require("express");

const router = express.Router();

//refer to controller
const controller = require("../controllers/user-controller");

//refer to middleware
const {validator, schemaCreate} = require("../middlewares/validateRequest")
const {schemaID} = require("../middlewares/validateRequest")

//Create data
router.post("/", validator.body(schemaCreate), controller.createUser)

//Retrieve data
router.get("/", controller.getData)

//Update
router.put("/", validator.body(schemaID), controller.updateUser)

//Delete
router.delete("/", validator.body(schemaID), controller.deleteUser)

//exports router
module.exports = router
