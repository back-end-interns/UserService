const Sequelize = require("sequelize");
const sequelize = new Sequelize('userservicedb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//refer to the model
db.user = require("../models/user")(sequelize, Sequelize);

module.exports = db;
