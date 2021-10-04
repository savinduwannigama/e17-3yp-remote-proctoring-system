const mongoose = require('mongoose')

const studentsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    regNo: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},  // student names and emails are required
    department: {type: String, default: ''},
    // relationship with the devices (HAS)
    device: {type: String, default: 'No device given'}  // FK | maps to the device that the student has

}, {collection: 'students'})

const model = mongoose.model('studentsModel', studentsSchema)

module.exports = model