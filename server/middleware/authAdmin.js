const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const verifyAdmin = asyncHandler((req, res, next) => {
    if (req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not an admin')
    }
});

module.exports = {
    verifyAdmin
}
