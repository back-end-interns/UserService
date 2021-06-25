const joi = require('joi');

const validator = require('express-joi-validation').createValidator({passError: true});

const schemaEnroll = joi.object({
    department_id: joi.number().required(),
    lrn: joi.number().required(),
    age: joi.number().required(),
    section: joi.string().required(),
    yearlevel: joi.number().required(),
    lastschool: joi.string().required(),
    presentbrgy: joi.string().required(),
    datem: joi.string().required(),
    statuss: joi.string().required()
})

const schemaID = joi.object({
    id: joi.number().required()
})

module.exports = {validator, schemaEnroll, schemaID};
