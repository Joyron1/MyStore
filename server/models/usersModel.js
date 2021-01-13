const Sequelize = require('sequelize');
const sequelize = require('../utils/databse')

const Users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    idNum: {
        type: Sequelize.INTEGER(11),
        allowNull: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true
    },
    city: {
        type: Sequelize.STRING,
        allowNull: true
    },
    street: {
        type: Sequelize.STRING,
        allowNull: true
    },
    role: {
        type: Sequelize.INTEGER(11),
        allowNull: true
    },
    session: {
        type: Sequelize.INTEGER(16),
        allowNull: true
    },
}, {
    charset: 'utf8',
    collate: 'utf8_general_ci'
});
module.exports = Users;