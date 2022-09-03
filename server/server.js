const express = require("express");
const path = require("path");
const userApi = require("./controllers/userController")
const productController = require("./controllers/productController")
const recordsController = require("./controllers/rental-recordsController")
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));

const mongoose = require('mongoose');
const { send } = require("process");
const url = "mongodb://localhost/rent";
mongoose.connect(url)
.then(() => {
  console.log('Mongo Connection Open');
})
.catch(err => {
  console.log('Mongo Connection Error');
  console.log(err);
})


app.use("/product", productController);
app.use("/user", userApi);
app.use('/record',recordsController)
const PORT = 4001;
app.listen(PORT, function () {
  console.log(`Server running on ${PORT}`);
});
