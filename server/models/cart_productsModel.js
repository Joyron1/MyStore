const Sequelize = require('sequelize');
const sequelize = require('../utils/databse')

const CartProducts = sequelize.define('cart_products', {
    id: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    product_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    product_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true
    },
    cart_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true
    },
    quantity: {
        type: Sequelize.INTEGER(11),
        allowNull: true
    },
    price: {
        type: Sequelize.INTEGER(11),
        allowNull: true
    },
    productTotal: {
        type: Sequelize.CHAR(5),
        allowNull: true
    }
}, {
    charset: 'utf8',
    collate: 'utf8_general_ci'
});
module.exports = CartProducts;