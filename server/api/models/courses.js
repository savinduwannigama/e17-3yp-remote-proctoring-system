const mongoose = require('mongoose')

const coursesSchema = new mongoose.Schema({
    course_code: {type: String, required: true, unique: true},
    course_name: {type: String, required: true},
    coordinator: {type: String, required: true},  // FK | maps to a proctor from 'proctors' | every course must have a coordinator

    // relationship with the proctors (TEACH)
    lecturers: [{procID: String}],  // FK | maps the proctors teaching the course

    // relationship with the students (ENROLLED)
    students: [String]  // FK | maps the students enrolled for a course
    
}, {collection: 'courses'})

const model = mongoose.model('coursesModel', coursesSchema)

module.exports = model