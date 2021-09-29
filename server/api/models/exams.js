const mongoose = require('mongoose')
const exam_rooms = require('./exam_rooms');  // importing the mongoose model for the collection 'exam_rooms'


const examsSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
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

// static function that will be called to create relevant exam rooms when admin creates an exam
examsSchema.statics.addExamRooms = function(info) {
    const exam = info.name;
    var room_name;
    var room_students = [];

    // students: [{regNo: String, participation: Boolean, joined_at: Date}] 
    // exams.addExamRooms({distinct_exam_rooms, name, students});
    // students.push({regNo, eligible, exam_room});

    info.distinct_exam_rooms.forEach(room => {  // loops once for each distinct exam room
        room_name = '"' + exam + '"_' + room;  // CHANGE THE FORMAT OF THE ROOM NAME

        info.students.forEach(student => {  // loops once for each student 
            if(student.exam_room == room){
                var tempStudent = {
                    regNo: student.regNo,
                    participation: false
                };
                room_students.push(tempStudent);  // adds student if his/her room is this room
            }
        });

        const newExamRoom = new exam_rooms({exam, room_name, room_students});

        newExamRoom.save()
        .then(() => {
            console.log('Created new exam_room: ' + newExamRoom);

        })
        .catch(err => res.status(400).json({Error: err}));
            
    });

};

const model = mongoose.model('examsModel', examsSchema)

module.exports = model