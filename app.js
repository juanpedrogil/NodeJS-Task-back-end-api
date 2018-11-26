const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const taskRoutes = require('./api/routes/tasks')
const userRoutes = require('./api/routes/users')

mongoose.connect('mongodb://localhost:27017/taskProject', { useNewUrlParser: true })

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","Origin, X-Request-With, Content-Type, Accept, Authorization")
    if(req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods","POST, PUT, PATCH, DELETE, GET")
        return res.status(200).json({})
    }
    next()
})

//Routes wich should handle request
app.use('/task',taskRoutes)
app.use('/user',userRoutes)


app.use((req,res,next) => {
    const error = new Error('Not found')
    error.status= 404
    next(error)
})

app.use((error,req,res,next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app