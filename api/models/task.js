const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    title: String,
    message: String,
    course: String,
    date: Date
})