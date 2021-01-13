const con = require('../utils/databse')
const Orders = require('../models/ordersModel');
const Cart = require('../models/cartModel');
const sendToClient = require('../utils/returnObToClient')

const fs = require('fs');


exports.getAllOrders = async (req, res, next) => {
    await Orders.findAll().then(result => {
        res.send(sendToClient(result, null, 1));
        console.log("orders:", result);
    }).catch(err => {
        res.send(sendToClient(null, err, 0))
    })
}

exports.insertOrder = async (req, res, next) => {
    console.log("order obj: ", req.body);
    let order = req.body;
    await Orders.create(order).then(newOrder => {
        res.send(sendToClient(newOrder, null, 1));
        console.log("new order:", newOrder)
    }).catch(err => {
        res.send(sendToClient(null, err, 0))
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

