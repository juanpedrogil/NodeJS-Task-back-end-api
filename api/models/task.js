const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    message: String,
    course: String,
    date: Date
})

module.exports = mongoose.model('Task',taskSchema)