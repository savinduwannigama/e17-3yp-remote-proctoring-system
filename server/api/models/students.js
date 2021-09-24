const mongoose = require('mongoose')

const studentsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true}  // student names and emails are required
}, {collection: 'students'})

const model = mongoose.model('studentsModel', studentsSchema)

module.exports = model