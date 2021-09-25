const mongoose = require('mongoose')

const proctorsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true}
    
}, {collection: 'proctors'})

const model = mongoose.model('proctorsModel', proctorsSchema)

module.exports = model