const express = require('express')
const router = express.Router()
const {registerUser, loginUser,getMe,getAllUsers,updateUser,deleteUser} = require('../servicese/user.services')
const { protect } = require('../middleware/authMiddleware')
const {verifyAdmin} = require("../middleware/authAdmin")
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', protect,verifyAdmin,getMe)
router.get('/',protect,verifyAdmin,getAllUsers)
router.put('/:id',protect,verifyAdmin,updateUser)
router.delete('/:id',protect,verifyAdmin,deleteUser)

module.exports = router
