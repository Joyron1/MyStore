const con = require('../utils/databse')
const CartPr = require('../models/cart_productsModel')
const sendToClient = require('../utils/returnObToClient')

// const fs = require('fs');

exports.getCartProducts = async (req, res, next) => {
    let cart_id = req.query.cart_id;
    await CartPr.findAll({ where: cart_id = cart_id }).then(res => {
        res.send(sendToClient(res, null, 1));
        console.log("cart products:", res)
    }).catch(err => {
        res.send(sendToClient(null, err, 0))
    })
}

exports.insertProductToCart = async (req, res, next) => {
    console.log("Insert cartProduct: ", req.body);
    let cartProduct = req.body;
    await CartPr.create(cartProduct).then(result => {
        res.send(sendToClient(result, null, 1));
        console.log("new cartProduct:", result)
    }).catch(err => {
        res.send(sendToClient(null, err, 0))
    })
}

exports.removeFromCart = async (req, res, next) => {
    let id = req.query.id;

    await CartPr.destroy({ where: { id: id } }).then(res => {
        res.send(sendToClient(res, null, 1));
        console.log("cart products:", res)
    }).catch(err => {
        res.send(sendToClient(null, err, 0));
    })
}

// exports.getAlbumById = async (req, res, next) => {
//     await Albums.findAll({
//         where: {
//             id: id
//         }
//     }).then(albums => {
//         res.send(albums);
//         console.log("albums:", albums)
//     }).catch(err => {
//         res.send("error load albums" + err)
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

