const express = require('express')
const router = express.Router()

//Get method to get all the tasks created ever
router.get('/', (req,res,next)=>{
    res.status(200).json({
        message: 'Handling GET request to /task'
    })
})

//Post method to add a new task to our database
router.post('/newTask', (req,res,next)=>{
    const task = {
        title: req.body.title,
        message: req.body.message,
        course: req.body.course,
        date: req.body.date
    }
    res.status(200).json({
        message: 'Handling POST request to /task',
        task: task
    })
})

//Get method to get a specific task
router.get('/:taskId', (req,res,next)=>{
    const id = req.params.productId
    res.status(200).json({
        message: 'Handling GET request to /task',
        id: id
    })
})

module.exports = router