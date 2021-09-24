const mongoose = require('mongoose')

const coursesSchema = new mongoose.Schema({
    name: {type: String, required: true},
    coordinator: {type: String, required: true},
}, {collection: 'courses'})

const model = mongoose.model('coursesModel', coursesSchema)

module.exports = model