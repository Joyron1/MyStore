const Sequelize = require('sequelize');
const sequelize = require('../utils/databse')

const Products = sequelize.define('products', {
    id: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    cat_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true
    },
    price: {
        type: Sequelize.STRING,
        allowNull: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true
    },
}, {
    charset: 'utf8',
    collate: 'utf8_general_ci'
});
module.exports = Products;