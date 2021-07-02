//services
const CRUD = require("../services/service");
const db = require("../config/config");
let service = new CRUD(db.enrollment);

//let logServ = new CRUD(db.logs);
//let user = new CRUD(db.user);


//for encryption
const bcrypt = require('bcrypt');

//for token
const jsonWT = require("jsonwebtoken");
const {secret} = require('../config/token');

//for response
const R = require("../helper/response");
let respo = new R();

exports.getEnrollment = async (req, res) => {
  const result = service.retrieve();
  console.log(req.id);
  respo.resRetrieve(res, result);
}

exports.createEnrollment = async (req, res) => {
  const result =  service.create(req.body);
  console.log(result);
  respo.resCreate(res, result);

  //const logs = logServ.create({description: "Enrollment Created", userID: AdminId});
  //console.log(logs);
}

exports.updateEnrollment = async (req, res) => {
  const values = req.body; 
  const condition = { where: { id: req.body.id}}; //specify where to update
  const result = service.update({values, condition}); 
  respo.resUpdate(res, result);
}

exports.deleteEnrollment = async (req, res) => {
  const result = service.delete({where: {id: req.body.id}}); //specify where to update
  respo.resDelete(res, result);
}
