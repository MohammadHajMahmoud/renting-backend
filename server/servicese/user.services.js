const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/user')
const { ErrorHandler } = require("../middleware/error");


const registerUser = asyncHandler(async (req, res) => {
  const {name,email,password,phone} = req.body

  if (!name || !email || !password ||!phone) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      phone : user.phone,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      phone : user.phone,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})


const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id },"secret stuff", {
    expiresIn: '30d',
  })
}
const getAllUsers = async(req,res)=>{
  try{
    const allUsers = await User.find({})
    res.send(allUsers)
  }catch(error){
    throw new ErrorHandler(error.statusCode, error.message);
  }
}

const updateUser = async (req, res) => {
  try {
      const userId = req.params.id;
      const newUserDetails = req.body
      const updatedUser = await User.findByIdAndUpdate(userId, newUserDetails , { new: true} )
      res.send(updatedUser);
  } catch(e) {
    throw new ErrorHandler(error.statusCode, error.message);
  }
}

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
      const deletedUser = await User.findByIdAndDelete(userId, { new: true })
      res.send(deletedUser);
  } catch(e) {
    throw new ErrorHandler(error.statusCode, error.message);
  }
}
module.exports = {
  registerUser,
  loginUser,
  getMe,
  getAllUsers,
  updateUser,
  deleteUser,
}

