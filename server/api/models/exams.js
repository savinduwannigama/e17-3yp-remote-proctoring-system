const mongoose = require('mongoose')

const examsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    // date: {type: Date, default: Date.now},
    startTime: {type: Date, required: true},  // it is a must that a exam has a start time
    endTime: Date,  // end time can be optional

    // relationship with the courses (HAS)
    course: String  // FK | maps to the correponding course

}, {collection: 'exams'})

const model = mongoose.model('examsModel', examsSchema)

module.exports = model