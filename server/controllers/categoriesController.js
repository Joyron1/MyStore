const con = require('../utils/databse')
const Categories = require('../models/categoriesModel')
const Products = require('../models/productsModel');
const sendToClient = require('../utils/returnObToClient')
const fs = require('fs');

exports.getAllCategories = async (req, res, next) => {
    await Categories.findAll({ include: [Products] }).then(categories => {
        res.send(sendToClient(categories, null, 1));
        console.log("categories:", categories)
    }).catch(err => {
        res.send(sendToClient(null, err, 0))
    })
}

exports.insertCategory = async (req, res, next) => {
    console.log("insertCategory: ", req.body);
    let category = req.body;
    await Categories.create(category).then(result => {
        res.send(sendToClient(result, null, 1));
        console.log("new category:", result)
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

