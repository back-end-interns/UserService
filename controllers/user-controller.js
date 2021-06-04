//refer to service
const { response } = require("express");
const service = require("../services/service");

//for encryption
const bcrypt = require('bcrypt');
const jsonWT = require("jsonwebtoken");
const {secret} = require('../config/token')

exports.getData = async (req, res) => {
  const result = await service.getData();
  console.log(req.id);
  res.status(200).send({message: "Succesfully Retrieved", data: result });
}

exports.createUser = async (req, res) => {
  try{
    var{
      department_id, 
      username, 
      password, 
      firstname, 
      middlename, 
      lastname, 
      address,
      contact_no,
      person_to_contact,
      emergency_contact,
      role,
      school_year,
      gender,
      dateOfBirth,
      placeOfBirth,
      religion,
      guardian
    } = req.body;

    bcrypt.hash(password, 5).then(async hash =>{

      password = hash;
      const body = {
      department_id, 
      username, 
      password, 
      firstname, 
      middlename, 
      lastname, 
      address,
      contact_no,
      person_to_contact,
      emergency_contact,
      role,
      school_year,
      gender,
      dateOfBirth,
      placeOfBirth,
      religion,
      guardian
      };
      const result = await service.createUser(body);
      console.log(result); //just to check
      res.send({message: "Succesfully Added", status: response});
    })
  }catch(err){
    throw Error(err);
  }
}

exports.updateUser = async (req, res) => {
  const values = req.body; //specify what to update
  const condition = { where: { id: req.body.id}} //specify where to update
  const result = await service.updateUser({values, condition}); 
  res.send({message: "Succesfully Updated", result});
}

exports.deleteUser = async (req, res) => {
  const result = await service.deleteUser({where: {id: req.body.id}}); //specify where to update
  res.status(300).send({message: "Succesfully Deleted", result});
}

exports.signInUser = async (req, res) => {
  const {username, password} = req.body;
  // select * from user where username = input
  await service.signIn({where: {username}}) //query
  .then(data => {
  //does username exist in the database?
    if(!data){
      return res.status(500).send({message: "User not found!"})
    }
  
  //compare incrypted password with inputed password
    const validPassword = bcrypt.compareSync(password, data.password)

  // valid password is empty return "invalid password"
    if(!validPassword){
      return res.status(500).send({message: "Invalid Password"})
    }

  //generate token for a specific user with a secret key to be added to the encryption
    var token = jsonWT.sign({id: data.id}, secret, {
      expireIn: 3600
    })

    res.status(200).send({token});
  })
}
