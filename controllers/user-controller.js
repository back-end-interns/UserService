const { response } = require("express");

//services
const CRUD = require("../services/service");
const db = require("../config/config");
let service = new CRUD(db.user);

//for encryption
const bcrypt = require('bcrypt');

//for token
const jsonWT = require("jsonwebtoken");
const {secret} = require('../config/token');

exports.getData = async (req, res) => {
  const result = service.retrieve();
  console.log(req.id);
  res.status(200).send({message: "Succesfully Retrieved", data: result });
}

exports.createUser = async (req, res) => {
  try{
    const values = {...req.body};
    
    bcrypt.hash(values.password, 5).then(async hash =>{

      values.password = hash;

      const result = service.create(values);

      res.send({message: "Succesfully Added", result});
    })
  }catch(err){
    throw Error(err);
  }
}

exports.updateUser = async (req, res) => {
  const values = req.body; //specify what to update
  const condition = { where: { id: req.body.id}}; //specify where to update
  const result = service.update({values, condition}); 
  res.send({message: "Succesfully Updated", result});
}

exports.deleteUser = async (req, res) => {
  const result = service.delete({where: {id: req.body.id}}); //specify where to update
  res.status(300).send({message: "Succesfully Deleted", result});
}

exports.signInUser = async (req, res) => {
  try{
    const {lrn, password} = req.body;
    console.log(lrn);
  // select * from user where username = input
    service.signIn({where: {lrn}}) //query
    .then(data => {
  //does username exist in the database?
      if(!data){
        return res.status(500).send({message: "User not found!"})
      }
      console.log(data);
  //compare encrypted password with inputed password
      const validPassword = bcrypt.compareSync(password, data.password)

  // valid password is empty return "invalid password"
      if(!validPassword){
        return res.status(500).send({message: "Invalid Password"})
      }

  //generate token for a specific user with a secret key to be added to the encryption
      var token = jsonWT.sign({id: data.id}, secret, {
        expiresIn: 3600
      })

      res.status(200).send({token});
    })
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
    res.status(300).send({message: "Succesfully Deleted", resultD});
  }
  const result = service.update({values, condition}); 
  res.send({message: "Succesfully ID Updated", result});
}
