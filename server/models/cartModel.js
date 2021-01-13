const Sequelize = require('sequelize');
const sequelize = require('../utils/databse')

const Cart = sequelize.define('cart', {
    id: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    user_id: {
        type: Sequelize.STRING,
        allowNull: true
    },
    status: {
        type: Sequelize.INTEGER(11),
        allowNull: true
    }
}, {
    charset: 'utf8',
    collate: 'utf8_general_ci'
});
module.exports = Cart;