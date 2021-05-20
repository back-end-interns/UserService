//refer to service
const service = require("../services/service");


exports.getData = async (req, res) => {
  const result = await service.getData();
  console.log(result);
  res.send({message: "Succesfully Retrieved", data: result });
}

exports.createUser = async (req, res) => {
  const result = await service.createUser(req.body);
  console.log(result);
  res.send({message: "Succesfully Added"});
}

exports.updateUser = async (req, res) => {
  const values = req.body; //specify what to update
  const condition = { where: { id: req.body.id}} //specify where to update
  const result = await service.updateUser({values, condition}); 
  res.send({message: "Succesfully Updated", result});
}

exports.deleteUser = async (req, res) => {
  const result = await service.deleteUser({where: {id: req.body.id}}); //specify where to update
  res.send({message: "Succesfully Added", result});
}