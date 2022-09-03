const Record = require('../models/rentRecord')
const Product  = require('../models/product')
const { ErrorHandler } = require("../middleware/error");

const getAllRecords = async (req, res) => {
    try {
        const AllRecords = await Record.find({})
        res.send(AllRecords)
    } catch(error) {
        throw new ErrorHandler(error.statusCode, error.message);
}
}
const addRecord = async (req, res) => {
    try {
        const  productId  = req.params.id;
        const product = await Product.findById(productId)
        let newRecord = new Record();
        newRecord.product = product
        newRecord.renter = req.user
        newRecord = await newRecord.save()
        res.send(newRecord)
    } catch(error) {
        throw new ErrorHandler(error.statusCode, error.message);
    }
}
const getRecord = async (req, res) => {
    try {
        const recordId = req.params.id;
        const record = await Record.findById(recordId).populate("product").populate("renter")
        res.send(record)
    } catch(error) {
        throw new ErrorHandler(error.statusCode, error.message);
    }
}

const updateRecord = async (req, res) => {
    try {
        const recordId = req.params.id;
        const record = req.body
        const updatedrecord = await Record.findByIdAndUpdate(recordId ,record, { new: true} )
        res.send(updatedrecord);
    } catch(error) {
        throw new ErrorHandler(error.statusCode, error.message);
    }
}

const deleteRecord = async (req, res) => {
    try {
        const recordId= req.params.id;
        const deletedrecord = await Record.findByIdAndDelete(recordId, { new: true });
        res.send(deletedrecord);
    } catch(error) {
        throw new ErrorHandler(error.statusCode, error.message);
    }
}
module.exports={
    deleteRecord,
    updateRecord,
    addRecord,
    getRecord,
    getAllRecords
}