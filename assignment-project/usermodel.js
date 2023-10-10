const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize('postgreDB', 'postgres', 'Postgre@1435', {
  host: 'localhost',
  dialect: 'postgres',
})

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  user_password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_image: {
    type: DataTypes.STRING,
  },
  total_orders: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  last_logged_in: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
})

sequelize.sync() // Create the table if it doesn't exist

module.exports = User
