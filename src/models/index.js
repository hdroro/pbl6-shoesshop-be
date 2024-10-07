import Sequelize from 'sequelize';
import sequelize from './configs/sequelizeConnection.js'; 

const db = {};

import userModel from './migrations/models/user.js';
import tokenModel from './migrations/models/token.js';

db.User = userModel(sequelize, Sequelize.DataTypes);
db.Token = tokenModel(sequelize, Sequelize.DataTypes);

export default db;
