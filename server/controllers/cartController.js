const con = require('../utils/databse');
const Carts = require('../models/cartModel');
const CartProducts = require('../models/cart_productsModel');
const sendToClient = require('../utils/returnObToClient');

// const fs = require('fs');

exports.getAllCarts = async (req, res, next) => {
    await Carts.findAll({ include: [CartProducts] }).then(res => {
        res.send(sendToClient(res, null, 1));
        console.log("carts:", res)
    }).catch(err => {
        res.send(sendToClient(null, err, 0))
    })
}

// exports.getCartByUserIdStatus = async (req, res, next) => {
//     let user_id = req.query.user_id;
//     let status = req.query.status;
//     console.log("id:", user_id, "status:", status)
//     await Carts.findAll({ include: [CartProducts], where: { user_id: user_id } }).then(result => {
//         res.send(sendToClient(result, null, 1));
//         console.log("Cart:", result)
//     }).catch(err => {
//         res.send(sendToClient(null, err, 0))
//     })
// }

exports.getCartByUserId = async (req, res, next) => {
    let user_id = req.query.user_id;

    console.log("id:", user_id)
    await Carts.findOne({ include: [CartProducts], where: { user_id: user_id, status: 0 } }).then(result => {
        res.send(sendToClient(result, null, 1));
        console.log("Cart:", result)
    }).catch(err => {
        res.send(sendToClient(null, err, 0))
    })
}


exports.insertCart = async (req, res, next) => {
    console.log("insert cart: ", req.body);
    let cart = req.body;
    await Carts.create(cart).then(res => {
        res.send(sendToClient(res, null, 1));
        console.log("new cart:", res)
    }).catch(err => {
        res.send(sendToClient(null, err, 0))
    })
}

exports.updateCartStatus = async (req, res, next) => {

    let cart_id = req.query.id;

    await Carts.update({ status: 1 }, {
        where: { id: cart_id }
    }).then(result => {
        res.send(sendToClient(result, null, 1));
        console.log("result:", result)
    }).catch(err => {
        res.send(sendToClient(null, err, 0));
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



