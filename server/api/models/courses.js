const mongoose = require('mongoose')

const coursesSchema = new mongoose.Schema({
    shortname: {type: String, required: true, unique: true},  // this field will be used as an unique identifier
    fullname: {type: String, required: true},
    department: {type: String, required: true},
    coordinator: {type: String, default: ""},  // FK | maps to a proctor from 'proctors' | every course must have a coordinator
    semester: Number,
    // relationship with the proctors (TEACH)
    lecturers: [String],  // FK | maps the proctors teaching the course | YET TO DECIDE WHAT TO STORE

    // relationship with the students (ENROLLED)
    students: [String],  // FK | maps the students enrolled for a course | stores the regNo of the students
    hasExam: {type: Boolean, default: false}  // cannot be edited by admin
}, {collection: 'courses'})


// method to remove a given array of students from a course
coursesSchema.methods.removeStudents = async function (toRemove) {
    
    for (let i = 0; i < this.students.length; i++) {
        const element = this.students[i];

        const found = await toRemove.find(x => x === element);  // checking whether the student is in the list of students to be removed
        console.log({found});
        if (found != undefined) {
            const spliced = this.student.splice(i, 1);
        console.log({spliced});
        }
    }

}
const model = mongoose.model('coursesModel', coursesSchema)

module.exports = model