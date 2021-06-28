//services
const CRUD = require("../services/service");
const db = require("../config/config");
let service = new CRUD(db.enrollment);
let userService = new CRUD(db.user);


//for encryption
const bcrypt = require('bcrypt');

//for token
const jsonWT = require("jsonwebtoken");
const {secret} = require('../config/token');

exports.getEnrollment = async (req, res) => {
  const result = service.retrieve();
  console.log(req.id);
  res.status(200).send({message: "Succesfully Retrieved", data: result });
}

exports.createEnrollment = async (req, res) => {
  const result =  service.create(req.body);
  console.log(result);
  res.status(200).send({message: "Succesfully Added"});
}

exports.updateEnrollment = async (req, res) => {
  const values = req.body; //specify what to update
  const condition = { where: { id: req.body.id}}; //specify where to update
  const result = service.update({values, condition}); 
  res.send({message: "Succesfully Updated", result});
}

exports.deleteEnrollment = async (req, res) => {
  const result = service.delete({where: {id: req.body.id}}); //specify where to update
  res.status(300).send({message: "Succesfully Deleted", result});
}

exports.signInEnrollment = async (req, res) => {
  try{
    const {lrn, password} = req.body;
    console.log(lrn);
  // select * from user where username = input
    userService.signIn({where: {lrn}}) //query
    .then(data => {
  //does username exist in the database?
      if(!data){
        return res.status(500).send({message: "User not found!"})
      }
      console.log(data);
  //compare encrypted password with inputed password
     
      const validPassword = bcrypt.compareSync(password, data.password);

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
