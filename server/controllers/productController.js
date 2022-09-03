const express = require("express");
const router = express.Router();
const {protect } = require('../middleware/authMiddleware')
const {verifyAdmin } = require('../middleware/authAdmin')
const {getAllProducts ,addProduct,getProduct,updateProduct,deleteProduct } = require("../servicese/products.services");
router.get("/", getAllProducts)
router.post('/',protect,addProduct)
router.get('/:id',getProduct)
router.put("/:id", protect, updateProduct)
router.delete("/:id", protect, deleteProduct)

module.exports = router;
