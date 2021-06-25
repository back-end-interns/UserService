const joi = require('joi');

const validator = require('express-joi-validation').createValidator({passError: true});

const schemaCreate = joi.object({
    lrn: joi.number().required(),
    department_id: joi.number().required(),
    password: joi.string().required(),
    firstname: joi.string().required(),
    middlename: joi.string().required(),
    lastname: joi.string().required(),
    address: joi.string().required(),
    permanentbrgy: joi.string().required(),
    permanentprovince: joi.string().required(),
    contact_no: joi.number().required(),
    password: joi.string().required(),
    person_to_contact: joi.string().required(),
    emergency_contact: joi.number().required(),
    role: joi.string().required(),
    school_year: joi.string().required(),
    gender: joi.string().required(),
    dateOfBirth: joi.string().required(),
    placeOfBirth: joi.string().required(),
    religion: joi.string().required(),
    guardian: joi.string().required(),
    status: joi.string().default("pending")
})

const schemaID = joi.object({
    id: joi.number().required()
})

module.exports = {validator, schemaCreate, schemaID};

