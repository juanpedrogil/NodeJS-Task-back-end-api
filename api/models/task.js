const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    message: {type: String, required: true},
    course: {type: String, required: true},
    date: {type: Date, required: true}
})

module.exports = mongoose.model('Task',taskSchema)