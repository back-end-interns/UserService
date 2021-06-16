const express = require("express");

const router = express.Router();

//refer to controller
const controller = require("../controllers/enroll-controller");

//refer to middleware
const {validator, schemaEnroll} = require("../middlewares/validateRequest");
const {schemaID} = require("../middlewares/validateRequest");

//Create data
router.post("/createEnrollment", validator.body(schemaEnroll), controller.createEnrollment)

//Retrieve data
router.get("/getEnrollment", controller.getEnrollment)

//Update
router.put("/updateEnrollment", validator.body(schemaID), controller.updateEnrollment)

//Delete
router.delete("/deleteEnrollment", validator.body(schemaID), controller.deleteEnrollment)


//exports router
module.exports = router
