const mongoose = require('mongoose')

const examsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    // date: {type: Date, default: Date.now},
    startTime: {type: Date, required: true},  // it is a must that a exam has a start time
    duration: String,  // end time can be optional (start time + duration)
    course_coordinator: String,
    chief_invigilator: String,
    invigilator: String,
    total_students: Number,
    students: [{regNo: String, eligible: Boolean, exam_room: String}],

    // relationship with the courses (HAS)
    course: String  // FK | maps to the correponding course

}, {collection: 'exams'})

const model = mongoose.model('examsModel', examsSchema)

module.exports = model