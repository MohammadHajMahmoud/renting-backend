const Product = require('../models/product')
const { ErrorHandler } = require("../middleware/error");

const getAllProducts = async (req,res)=>{
    try{
        const products = await Product.find({})
        res.status(200).send(products)
    }catch(error){
        throw new ErrorHandler(error.statusCode, error.message);    
    }
}
const addProduct = async(req,res)=>{
    try{
        const product = req.body
        let newProduct = new Product(product)
        newProduct.owner=req.user
        newProduct = await newProduct.save()
        res.status(201).send(newProduct)
    }catch(error){
        throw new ErrorHandler(error.statusCode, error.message);  
    }
}
const getProduct = async(req,res)=>{
    try{
        const {productId} = req.params
        let product = await Product.findById(productId)
        res.send(product)
    }catch(error){
        throw new ErrorHandler(error.statusCode, error.message);  
    }
}
const updateProduct = async(req,res)=>{
    try{
        const productId = req.params.id;
        const product = req.body
        const updatedProduct = await Product.findByIdAndUpdate(productId, product, { new: true } )    
        res.send(updatedProduct)
    }catch(error){
        throw new ErrorHandler(error.statusCode, error.message); 
    }
}
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId, { new: true });
        res.send(deletedProduct);
    } catch(e) {
        throw new ErrorHandler(error.statusCode, error.message); 
    }
}
module.exports={
    getAllProducts,
    addProduct,
    getProduct,
    updateProduct,
    deleteProduct
}