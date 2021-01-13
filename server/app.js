const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http')
const bodyParser = require('body-parser');

const Sequelize = require('sequelize');
const sequelize = require('./utils/databse');

var path = require("path");
app.use(express.static(path.join(__dirname, "../uploads")));

const server = http.createServer(app);

const users = require('./models/usersModel');
const categories = require('./models/categoriesModel');
const products = require('./models/productsModel');
const carts = require('./models/cartModel');
const cart_products = require('./models/cart_productsModel');
const orders = require('./models/ordersModel');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors(corsOptions))

const usersRoute = require('./routes/usersRoute');
app.use("/users", usersRoute);
const categoriesRoute = require('./routes/categoriesRoute');
app.use("/categories", categoriesRoute);
const productsRoute = require('./routes/productsRoute');
app.use("/products", productsRoute);
const cartRoute = require('./routes/cartRoute');
app.use("/cart", cartRoute);
const cart_productsRoute = require('./routes/cart_productsRoute');
app.use("/cart", cart_productsRoute);
const ordersRoute = require('./routes/ordersRoute');
app.use("/orders", ordersRoute);


app.use((req, res) => {
    res.send("myStore - Page Not Found");
})

categories.hasMany(products, { foreignKey: { name: 'cat_id' } });
carts.hasMany(cart_products, { foreignKey: { name: 'cart_id' } });
carts.hasMany(orders, { foreignKey: { name: 'cart_id' } });
users.hasMany(carts, { foreignKey: { name: 'user_id' } });
users.hasMany(orders, { foreignKey: { name: 'user_id' } });

sequelize.sync().then(result => {
    server.listen(5000);
}).catch(err => {
    res.send("myStore - Error on listening to server");
})