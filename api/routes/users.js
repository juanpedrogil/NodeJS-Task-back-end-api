//IMPORTS
const express = require('express')
const router = express.Router()
const Task = require('../models/task')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

//Create a new user to our database
router.post('/signup', (req,res,next) => {
    //First verify if there's an user already
    User.find({ username: req.body.username }).exec().then(user => {
        //If there's an user we've gotta abort the creation
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'Username already exists!'
            })
        //If the username doesn't exists yet we've gotta create a new one
        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                password: req.body.password
            })
            user.save().then(result => {
                res.status(201).json({
                    message: 'User created'
                })
            }).catch(err => {
                res.status(500).json({
                    error: err
                })
            })
        }
    }).catch(err => {
        return res.status(500).json({
            error: err
        })
    })
})

//Delete an user through userId in params
router.delete('/:userId', (req,res,next) => {
    User.remove({_id: req.params.userId}).exec()
    .then( result => {
        res.status(201).json({
            message: 'User deleted'
        })
    })
    .catch( err => {
        res.status(500).json({
            error: err
        })
    })

})

//Try to log in and return the auth token to request data safely
router.post('/login', (req,res,next) => {
    //Verify if the username exists
    User.find({username: req.body.username})
    .exec()
    .then(user => {
        if (user.length < 1) {
            //If not exists
            return res.status(404).json({
                message: 'Auth failed!'
            })
        } else {
            //If exists
            if (user[0].password === req.body.password){
                //If the password was correct
                //Create the auth token
                const token = jwt.sign({
                    username: user[0].username,
                    userId: user[0]._id
                }, 'secret', {
                    expiresIn: '1h'
                })
                return res.status(201).json({
                    message: 'Auth successful!',
                    token: token
                })
            } else {
                //If the password wasn't correct
                return res.status(404).json({
                    message: 'Auth failed!'
                })
            }
        }
    })
    .catch(err => {
        return res.status(500).json({
            error: err
        })
    })
})

module.exports = router