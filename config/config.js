const Sequelize = require("sequelize");
const sequelize = new Sequelize('sequelizedb', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.food = require("../models/food")(sequelize, Sequelize);

module.exports = db;
