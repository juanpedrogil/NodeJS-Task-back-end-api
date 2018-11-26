const jwt = require('jsonwebtoken')

//This verifys if there's a valid token to response something
module.exports = (req,res,next) => {
    try {
        //This separates the header = value token
        const token=req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token,'secret')
        req.userData = decoded
    } catch (err) {
        return res.status(401).json({
            message: 'Auth failed!'
        })
    }
    next()
}