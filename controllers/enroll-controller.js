const service = require("../services/enroll-service");

exports.getEnrollment = async (req, res) => {
  const result = await service.getEnrollment();
  console.log(result);
  res.status(200).send({message: "Succesfully Retrieved", data: result });
}

exports.createEnrollment = async (req, res) => {
  const result = await service.createEnrollment(req.body);
  console.log(result);
  res.status(200).send({message: "Succesfully Added"});
}

exports.updateEnrollment = async (req, res) => {
  const values = req.body;
  const condition = { where: { id: req.body.id}}
  const result = await service.updateEnrollment({values, condition});
  res.status(200).send({message: "Succesfully Updated", result});
}

exports.deleteEnrollment = async (req, res) => {
  const result = await service.deleteEnrollment({where: {id: req.body.id}});
  res.status(200).send({message: "Succesfully Deleted", result});
}
