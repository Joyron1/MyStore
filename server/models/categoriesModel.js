const Sequelize = require('sequelize');
const sequelize = require('../utils/databse')

const Categories = sequelize.define('categories', {
    id: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    charset: 'utf8',
    collate: 'utf8_general_ci'
});
module.exports = Categories;