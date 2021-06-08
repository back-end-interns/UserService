const dotenv = require('dotenv');
dotenv.config({path: './.env'});

const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.db_name, process.env.db_username, process.env.db_password, {
  host: process.env.db_host,
  dialect: 'mysql'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//refer to the model
db.user = require("../models/user")(sequelize, Sequelize);

module.exports = db;
