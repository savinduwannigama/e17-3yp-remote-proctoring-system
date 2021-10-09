const mongoose = require('mongoose')

const proctorsSchema = new mongoose.Schema({
    name: {type: String, required: true},  // used as the PK for now | must change PK to email
    email: {type: String, required: true, unique: true}
    
}, {collection: 'proctors'})

const model = mongoose.model('proctorsModel', proctorsSchema)

module.exports = model