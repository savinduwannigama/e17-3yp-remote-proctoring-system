const mongoose = require('mongoose')

const studentsSchema = new mongoose.Schema({
    name: String,
    email: {type: String, required: true}
}, {collection: 'students'})

const model = mongoose.model('studentsModel', studentsSchema)

module.exports = model