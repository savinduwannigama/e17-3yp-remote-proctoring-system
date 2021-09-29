const mongoose = require('mongoose')

const adminsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},  // student names and emails are required
    role: {type: String, required: true}

}, {collection: 'admins'})

const model = mongoose.model('adminsModel', adminsSchema)

module.exports = model