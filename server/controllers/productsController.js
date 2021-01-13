const con = require('../utils/databse')
const Products = require('../models/productsModel')
const sendToClient = require('../utils/returnObToClient')

const fs = require('fs');

exports.getAllProducts = async (req, res, next) => {
    await Products.findAll().then(products => {
        res.send(sendToClient(products, null, 1));
    }).catch(err => {
        res.send(sendToClient(null, err, 0))
    })
}

exports.getProductById = async (req, res, next) => {
    let id = req.query.id;
    console.log("id:", id)
    await Products.findAll({ where: { id: id } }).then(product => {
        res.send(sendToClient(product, null, 1));
    }).catch(err => {
        res.send(sendToClient(null, err, 0))
    })
}

exports.getProductsByCatId = async (req, res, next) => {
    let catId = req.query.catId;
    console.log("catId:", catId)
    await Products.findAll({ where: { cat_id: catId } }).then(products => {
        res.send(sendToClient(products, null, 1));
    }).catch(err => {
        res.send(sendToClient(null, err, 0))
    })
}

exports.addNewProduct = async (req, res, next) => {

    let product = req.body;
    console.log("Inserted product: ", product);
    if (req.files[0])
        product.image = req.files[0].filename;

    await Products.create(product).then(result => {
        res.send(sendToClient(result, null, 1));
        console.log("new product:", result)
    }).catch(err => {
        res.send(sendToClient(null, err, 0));
    })
}

exports.updateProduct = async (req, res, next) => {
    let product = req.body;
    if (req.files[0])
        product.image = req.files[0].filename;
    console.log(product);
    await Products.update(product, {
        where: { id: product.id }
    }).then(result => {
        res.send(sendToClient(result, null, 1));
        console.log("new product:", result)
    }).catch(err => {
        res.send(sendToClient(null, err, 0));
    })
}

exports.deleteProduct = async (req, res, next) => {
    let id = req.query.id;

    await Products.destroy({ where: { id: id } }).then(result => {
        res.send(sendToClient(result, null, 1));
    }).catch(err => {
        res.send(sendToClient(null, err, 0));
    })
}

