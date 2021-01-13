const con = require('../utils/databse');
const Users = require('../models/usersModel');
const Orders = require('../models/ordersModel');
const Carts = require('../models/cartModel');
const sendToClient = require('../utils/returnObToClient');

const fs = require('fs');
const CartProducts = require('../models/cart_productsModel');


exports.getUsers = async (req, res, next) => {
    await Users.findAll().then(result => {
        res.send(sendToClient(result, null, 1));
        console.log("users:", result)
    }).catch(err => {
        res.send(sendToClient(null, err, 0))
    })
}

exports.insertUser = async (req, res, next) => {
    let user = req.body;
    console.log("user:", user)
    await Users.create(user).then(result => {
        res.send(sendToClient(result, null, 1));
        console.log("new user:", result)
    }).catch(err => {
        res.send(sendToClient(null, err, 0))
    })
}

exports.userExist = async (req, res, next) => {
    let email = req.query.email;
    let password = req.query.password;

    await Users.findOne({
        include: [Carts, Orders],
        where: {
            email: email,
            password: password
        }
    }).then(user => {
        res.send(sendToClient(user, null, 1));
        console.log("Exist User:", user)
    }).catch(err => {
        res.send(sendToClient(null, err, 0))
    })
}

exports.mailExist = async (req, res, next) => {
    let email = req.query.email;

    await Users.findOne({ where: { email: email, } }).then(result => {
        if (result.email === email) {
            res.send(sendToClient(result, null, 2));
            console.log("Exist Mail:", result)
        }
    }).catch(err => {
        res.send(sendToClient(null, err, 0))
    })
}

exports.idNumExist = async (req, res, next) => {
    let id = req.query.idNum;

    await Users.findAll({ where: { idNum: id } }).then(result => {
        if (result.length > 0) {
            res.send(sendToClient(result, null, 3));
            console.log("Exist idNum:", result)
        }
        else {
            res.send(id)
        }
    }).catch(err => {
        res.send(sendToClient(null, err, 0))
    })
}


// exports.deleteAlbum = async (req, res, next) => {
//     let id = req.query.id;

//     await Albums.destroy({
//         where: {
//             id: id
//         }
//     }).then(albums => {
//         res.send(sendToClient(albums, null, 1));
//         console.log("albums:", albums)
//     }).catch(err => {
//         res.send(sendToClient(null, err, 0));
//     })
// }

// exports.updateAlbum = async (req, res, next) => {

//     await Albums.update(req.body, {
//         where: {
//             id: req.body.id
//         }
//     }).then(albums => {
//         res.send(sendToClient(albums, null, 1));
//         console.log("albums:", albums)
//     }).catch(err => {
//         res.send(sendToClient(null, err, 0));
//     })
// }

