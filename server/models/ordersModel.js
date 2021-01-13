const Sequelize = require('sequelize');
const sequelize = require('../utils/databse')

const Orders = sequelize.define('orders', {
    id: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    user_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true
    },
    cart_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true
    },
    totalPrice: {
        type: Sequelize.STRING,
        allowNull: true
    },
    toCity: {
        type: Sequelize.STRING,
        allowNull: true
    },
    toStreet: {
        type: Sequelize.STRING,
        allowNull: true
    },
    orderDate: {
        type: Sequelize.STRING,
        allowNull: true
    },
    card: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    charset: 'utf8',
    collate: 'utf8_general_ci'
});
module.exports = Orders;