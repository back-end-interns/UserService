const express = require("express");

const router = express.Router();

//refer to controller
const controller = require("../controllers/user-controller");

//refer to middleware
const {validator, schemaCreate} = require("../middlewares/validateRequest");
const {schemaID} = require("../middlewares/validateRequest");
const verifyToken = require("../middlewares/verifyToken");

//Create data
router.post("/create", validator.body(schemaCreate), controller.createUser)

//Retrieve data
router.get("/", verifyToken, controller.getData)

//Update
router.put("/update", validator.body(schemaID), controller.updateUser)

//Delete
router.delete("/delete", validator.body(schemaID), controller.deleteUser)

//SignIn
router.post("/signin", controller.signInUser)

//Update Status
router.put("/updateStatus", validator.body(schemaID), controller.updateStatus)

//exports router
module.exports = router
