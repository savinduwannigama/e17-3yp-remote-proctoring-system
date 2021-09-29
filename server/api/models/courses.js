const mongoose = require('mongoose')

const coursesSchema = new mongoose.Schema({
    shortname: {type: String, required: true, unique: true},
    fullname: {type: String, required: true},
    department: {type: String, required: true},
    coordinator: {type: String, required: false},  // FK | maps to a proctor from 'proctors' | every course must have a coordinator
    semester: Number,
    // relationship with the proctors (TEACH)
    lecturers: [String],  // FK | maps the proctors teaching the course

    // relationship with the students (ENROLLED)
    students: [String]  // FK | maps the students enrolled for a course
    
}, {collection: 'courses'})

const model = mongoose.model('coursesModel', coursesSchema)

module.exports = model