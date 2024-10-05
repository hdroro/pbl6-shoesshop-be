const Sequelize = require('sequelize');
const sequelize = require('./configs/sequelizeConnection'); 

const db = {};

db.User = require('./migrations/models/user')(sequelize, Sequelize.DataTypes);
db.Token = require('./migrations/models/token')(sequelize, Sequelize.DataTypes);

module.exports = db;
