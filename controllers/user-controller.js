const { response } = require("express");

//services
const CRUD = require("../services/service");
const db = require("../config/config");
let service = new CRUD(db.user);

//for encryption
const HaC = require("../helper/hashAndComp");
let hashAndComp = new HaC();

//for response
const R = require("../helper/response");
let respo = new R();

exports.getData = async (req, res) => {
  const result = service.retrieve();
  console.log(req.id);
  respo.resRetrieve(res, result);
}

exports.createUser = async (req, res) => {
  try{
    const values = {...req.body};
    const result = hashAndComp.hashing(values, service);
    respo.resCreate(res, result);
  }catch(err){
    throw Error(err);
  }
}

exports.updateUser = async (req, res) => {
  const values = req.body; //specify what to update
  const condition = { where: { id: req.body.id}}; //specify where to update
  const result = service.update({values, condition}); 
  respo.resUpdate(res, result);
}

exports.deleteUser = async (req, res) => {
  const result = service.delete({where: {id: req.body.id}}); //specify where to delete
  respo.resDelete(res, result);
}

exports.signInUser = async (req, res) => {
  try{
    const {lrn, password} = req.body;
    hashAndComp.comparing(service, res, lrn, password);
  }catch(err){
    throw Error(err);
  }
}

//update the status and then when it is decline it is deleted
exports.updateStatus = async (req, res) => {
  const values = req.body.status; 
  const condition = { where: { id: req.body.id}}; 
  if (values == "decline"){
    const resultD = service.delete(condition); 
    respo.resDelete(res, resultD);
  }
  const result = service.update({values, condition}); 
  respo.resUpdate(res, result)
}
