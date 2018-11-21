//IMPORTS
const express = require('express')
const router = express.Router()
const Task = require('../models/task')
const mongoose = require('mongoose')

//Get method to get all the tasks created ever
router.get('/', (req,res,next)=>{
    Task.find().exec().then(result => {
        res.status(200).json(result)
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

//Post method to add a new task to our database
router.post('/newTask', (req,res,next)=>{
    const id = new mongoose.Types.ObjectId()
    console.log(id)
    const task = new Task({
        _id: id,
        title: req.body.title,
        message: req.body.message,
        course: req.body.course,
        date: req.body.date
    })
    task.save().then(result => {
        console.log(result)
        res.status(200).json(result)
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

//Get method to get a specific task
router.get('/:taskId', (req,res,next)=>{
    const id = req.params.taskId
    Task.findById(id).exec().then(doc => {
        console.log(doc)
        if(doc) {
            res.status(200).json(doc)
        } else {
            res.status(404).json({
                message: 'No valid entry for provided ID'
            })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

//Delete method to delete a task from de collection
router.delete('/:taskId',(req,res,next) => {
    const id = req.params.taskId
    Task.remove({_id: id}).exec().then(result => {
        res.status(200).json(result)
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

//Put method to update a task
router.put('/:taskId',(req,res,next) => {
    const id = req.params.taskId
    Task.update({_id:id},{$set:{
        title: req.body.title,
        message: req.body.message,
        course: req.body.course,
        date: req.body.date
    }}).then(result => {
        res.status(200).json(result)
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router