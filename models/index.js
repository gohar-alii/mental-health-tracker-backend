import { Sequelize } from 'sequelize';
import config from '../config/config.js';
import userModel from './user.js';
import logModel from './log.js';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    dialectOptions: dbConfig.dialectOptions,
    pool: dbConfig.pool,
    logging: dbConfig.logging
  }
);

const db = {
  User: userModel(sequelize),
  Log: logModel(sequelize),
  sequelize,
  Sequelize
};

// Set up associations
db.Log.belongsTo(db.User, { foreignKey: 'userId' });
db.User.hasMany(db.Log, { foreignKey: 'userId' });

export default db;