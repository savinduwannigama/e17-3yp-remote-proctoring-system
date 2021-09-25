const mongoose = require('mongoose')

const exam_roomsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    startTime: {type: Date, required: true},  // it is a must that a exam has a start time
    endTime: Date,  // end time can be optional
    room_name: {type: String, default: this.name},

    // relationship with the proctors (PROCTORS)
    proctor_incharge: {type: String, required: true},  // FK | every exam room must have a proctor incharge. // stores the _id from the 'proctors' collection
    proctors: [{procID: String, role: String}],  // FK | maps the other proctors joining the exam room | has multiple proctors

    // relationship with the exams (HAS)
    exam: {type: String, required: true},  // FK | stores the _id of the corresponding exam

    // relationship with the students (JOINS)
    students: [{studID: String, participation: Boolean, joined_at: Date}]  // FK | maps the students joining an exam room | has multiple students
    
}, {collection: 'exam_rooms'})

const model = mongoose.model('exam_roomsModel', exam_roomsSchema)

module.exports = model