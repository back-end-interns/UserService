const user = require("../models/user");
const enrollService = require("../services/enrollService");

//for encryption
const bcrypt = require('bcrypt');

//for token
const jsonWT = require("jsonwebtoken");
const {secret} = require('../config/token');

exports.getEnrollment = async (req, res) => {
  const result = await enrollService.getEnrollment();
  console.log(result);
  res.status(200).send({message: "Succesfully Retrieved", data: result });
}

exports.createEnrollment = async (req, res) => {
  const result = await enrollService.createEnrollment(req.body);
  console.log(result);
  res.status(200).send({message: "Succesfully Added"});
}

exports.updateEnrollment = async (req, res) => {
  const values = req.body;
  const condition = { where: { id: req.body.id}}
  const result = await enrollService.updateEnrollment({values, condition});
  res.status(200).send({message: "Succesfully Updated", result});
}

exports.deleteEnrollment = async (req, res) => {
  const result = await enrollService.deleteEnrollment({where: {id: req.body.id}});
  res.status(200).send({message: "Succesfully Deleted", result});
}

exports.logInEnrollment = async (req, res) => {
  try{
    const {lrn, password} = req.body; //takes user input
    console.log(lrn);

    // check if the lrn exist in user schema
    await enrollService.logInEnrollment({where: {lrn}})
    .then(data => {
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
