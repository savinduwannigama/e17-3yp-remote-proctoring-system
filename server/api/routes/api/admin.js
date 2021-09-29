const express = require('express');
const mongoose = require('mongoose');

// importing the mongoose models ///////////////////////////////////////////////////////////////////////////////

const devices = require('../../models/devices');  // importing the mongoose model for the collection 'devices'
const admins = require('../../models/admins');  // importing the mongoose model for the collection 'admins'

////////// proctor accessible collections

const proctors = require('../../models/proctors');  // importing the mongoose model for the collection 'proctors'

const recordings = require('../../models/recordings');  // importing the mongoose model for the collection 'recordings'

////////// student accessible collections

const students = require('../../models/students');  // importing the mongoose model for the collection 'students'
const courses = require('../../models/courses');  // importing the mongoose model for the collection 'courses'
const exams = require('../../models/exams');  // importing the mongoose model for the collection 'exams'
const exam_rooms = require('../../models/exam_rooms');  // importing the mongoose model for the collection 'exam_rooms'

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const router = express.Router();


/**
 * API calls to the admins collection
 */
// add new admin to the database
router.post('/admins', (req, res) => {
    // method to add a new entry to the user relation in the database
    /**
     * write code to add student to the database
     */

    const record = req.body;
    console.log('Request body: ' + record);
    
    // const response = await admins.create(record);  // response is the return value from mongoDB
    // gives the request body straight away as the object to be created
    const newAdmin = new admins(record);
    // saves the new admin object
    newAdmin.save()
    .then(() => {
        res.json({status: 'Addded new admin to the database'});
        console.log('Created new admin entry: ' + newAdmin);
    })
    .catch(err => res.status(400).json({Error: err}));
    
 
    // res.json({status: 'Addded new admin to the database'});  // response after succcesfully creating a new exam schedule


    // redirecting to the login page after a successful registration
    // res.redirect('/*path of the page to redirect to after regitering */'); 
});

// reading all administrators
router.get('/admins/all', (req, res) => {
    const req_body = req.body;
    console.log('Request body: ' + req_body);

    // const records = await admins.find(req_body);
    // console.log('Sending response: ' + records);

    admins.find()
    .then(result => res.json(result))
    .catch(err => res.status(400).json({Error: err }));
});

// reading an admin by id (own info to populate the page)
router.get('/admins/self/:id', (req, res) => {
    // const req_body = req.body;
    // console.log('Request body: ' + req_body);

    // const records = await admins.find(req_body);
    // console.log('Sending response: ' + records);

    admins.findById(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(400).json("Error : " +err ));
});

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
/**
 * API calls to the students collection
 */
// add new student to the database
router.post('/students/single', (req, res) => {
    // method to add a new entry to the user relation in the database
    /**
     * write code to add student to the database
     */

    const record = req.body;
    console.log('Request body: ' + record);

    // const response = await students.create(record);  // response is the return value from mongoDB
    // adds the request body straight away as the object to be created
    const newStudent = new students(record);
    // saves the new student
    newStudent.save()
    .then(() => {
        console.log('Created new student entry: ' + newStudent);
        res.json({status: 'Addded new student to the database'});
    })
    .catch(err => res.status(400).json({Error: err}));

    // console.log('Created new student entry: ' + response);
 
    // res.json({status: 'Addded new student to the database'});  // response after succcesfully creating a new exam schedule


    // redirecting to the login page after a successful registration
    // res.redirect('/*path of the page to redirect to after regitering */'); 
});

// add multiple stuedents from a sheet 
// receiving object => {"uploaded file": "students", "details": [[], [], [start], ..., [end]]}
router.post('/students/multiple', async (req, res) => {
    const record = req.body;
    console.log('Request body: ' + record);
    // console.log(record.details[0][0]);

    for (let i = 2; i < record.details.length; i++) {  // ADD CODE TO CHECK DATABASE FOR ALREADY EXISTING STUDENT, AND ONLY TRY TO ADD IF NOT
        if(record.details[i].length ==  5) {  // skips an entire record if it doesn't have 5 fields
            const regNo = record.details[i][1];
            const name = record.details[i][2];
            const email = record.details[i][3];
            const department = record.details[i][4];

            // const response = await students.create({regNo, name, email, department});  // response is the return value from mongoDB
            // console.log('Created new student entry (' + i-1 + '): ' + response);

            const newStudent = new students({regNo, name, email, department});
            // saves the new student
            newStudent.save()
            .then(() => {
                console.log('Created new student entry: ' + newStudent);
                // res.json({status: 'Addded new student to the database'});
            })
            .catch(err => res.status(400).json({Error: err}));  // MIGHT GIVE AN ERROR 
        }
    }
    /**
     * have to handle errors of => adding an already existing student, trying to add a student without a required field
     */
    res.json({status: 'created all students successfully!'});
});

// call to read all students
router.get('/students/all', (req, res) => {
    const req_body = req.body;
    console.log('Request body: ' + req_body);

    // const records = await admins.find(req_body);
    // console.log('Sending response: ' + records);

    students.find()
    .then(result => res.json(result))
    .catch(err => res.status(400).json({Error: err }));
});



/**
 * API calls to the proctors collection
 */
// add a new proctor to the database
router.post('/proctors', (req, res) => {
    // method to add a new entry to the user relation in the database
    /**
     * write code to add student to the database
     */

    const record = req.body;
    console.log('Request body: ' + record);
    
    // const response = await proctors.create(record);  // response is the return value from mongoDB

    const newProctor = new proctors(record);
    //saving the new proctor
    newProctor.save()
    .then(() => {
        console.log('Created new proctor entry: ' + newProctor);
        res.json({status: 'Addded new proctor to the database'});  // response after succcesfully creating a new exam schedule

    })
    .catch(err => res.status(400).json({Error: err}));

    // console.log('Created new proctor entry: ' + response);
 
    // res.json({status: 'Addded new proctor to the database'});  // response after succcesfully creating a new exam schedule

    // redirecting to the login page after a successful registration
    // res.redirect('/*path of the page to redirect to after regitering */'); 
});

// call to read all proctors
router.get('/proctors/all', (req, res) => {
    const req_body = req.body;
    console.log('Request body: ' + req_body);

    // const records = await admins.find(req_body);
    // console.log('Sending response: ' + records);

    proctors.find()
    .then(result => res.json(result))
    .catch(err => res.status(400).json({Error: err }));
});



/**
 * API calls to the courses collection
 */
// add 1 new course to the database
router.post('/courses/single', (req, res) => {
    // method to add a new entry to the user relation in the database
    /**
     * write code to add student to the database
     */

    const record = req.body;
    console.log('Request body: ' + record);
    
    // const response = await courses.create(record);  // response is the return value from mongoDB

    // adds the request body straight away as the object to be created
    const newCourse = new courses(record);
    // saves the new student
    newCourse.save()
    .then(() => {
        console.log('Created new course entry: ' + newCourse);
        res.json({status: 'Addded new course to the database'});
    })
    .catch(err => res.status(400).json({Error: err}));

    // console.log('Created new course entry: ' + response);
 
    // res.json({status: 'Addded new course to the database'});  // response after succcesfully creating a new exam schedule


    // redirecting to the login page after a successful registration
    // res.redirect('/*path of the page to redirect to after regitering */'); 
});

// add multiple courses from a sheet 
// receiving object => {"uploaded file": "courses", "details": [[], [start], [], ..., [end]]}
router.post('/courses/multiple', (req, res) => {
    const record = req.body;
    console.log('Request body: ' + record);
    // console.log(record.details[0][0]);

    for (let i = 1; i < record.details.length; i++) {  // ADD ERROR HANDLING TO CHECK WHETHER A COURSE ALREADY EXISTS BEFORE ADDING, AND ONLY ADD IF NOT
        const shortname = record.details[i][0];
        const fullname = record.details[i][1];
        const department = record.details[i][2];
        const semester = record.details[i][3];

        // const response = await courses.create({shortname, fullname, department, semester});  // response is the return value from mongoDB
        // console.log('Created new course entry (' + i + '): ' + response);
        const newCourse = new students({shortname, fullname, department, semester});
        // saves the new student
        newCourse.save()
        .then(() => {
            console.log('Created new course entry: ' + newCourse);
            // res.json({status: 'Addded new student to the database'});
        })
        .catch(err => res.status(400).json({Error: err}));  // MIGHT GIVE AN ERROR 
    }
    /**
     * have to handle errors of => adding an already existing course, trying to add a course without a required field
     */
    res.json({status: 'created all courses successfully!'});
});

// call to read all courses
router.get('/courses/all', (req, res) => {
    const req_body = req.body;
    console.log('Request body: ' + req_body);

    // const records = await admins.find(req_body);
    // console.log('Sending response: ' + records);

    courses.find()
    .then(result => res.json(result))
    .catch(err => res.status(400).json({Error: err }));
});

/**
 * API calls to the devices collection
 */
// add a new device to the database
router.post('/devices/single', (req, res) => {
    // method to add a new entry to the user relation in the database
    /**
     * write code to add device to the database
     */

    const record = req.body;
    console.log('Request body: ' + record);
    
    // const response = await devices.create(record);  // response is the return value from mongoDB
    
    const newDevice = new courses(record);
    // saves the new device
    newDevice.save()
    .then(() => {
        console.log('Created new device entry: ' + newDevice);
        res.json({status: 'Addded new device to the database'});
    })
    .catch(err => res.status(400).json({Error: err}));
    
    // console.log('Created new device entry: ' + response);
 
    // res.json({status: 'Addded new device to the database'});  // response after succcesfully creating a new exam schedule


    // redirecting to the login page after a successful registration
    // res.redirect('/*path of the page to redirect to after regitering */'); 
});

// call to read all devices
router.get('/devices/all', (req, res) => {
    const req_body = req.body;
    console.log('Request body: ' + req_body);

    // const records = await admins.find(req_body);
    // console.log('Sending response: ' + records);

    devices.find()
    .then(result => res.json(result))
    .catch(err => res.status(400).json({Error: err }));
});

/**
 * API calls to the exams collection
 */
// scheduling and exam (REDUNDANT --> in proctor.js)
router.post('/exams/single', async (req, res) => {
    /**
     * add code to add a new exam to the database
     * add a auto generated id 
     * have to generate a URL/link for the meeting and store in the database
     */

    const record = req.body;
    console.log('Request body: ' + record);

    // const response = await exams.create(record);  // response is the return value from mongoDB
    
    const newExam = new courses(record);
    // saves the new device
    newExam.save()
    .then(() => {
        console.log('Created new exam entry: ' + newExam);
        res.json({status: 'Addded new exam to the database'});
    })
    .catch(err => res.status(400).json({Error: err}));
    
    // console.log('Created new exam: ' + response);

    // res.json({status: 'Addded new exam schedule'});  // response after succcesfully creating a new exam schedule
     
});

// add an exam from the mastersheet 
// receiving object => {"uploaded file": "mastersheet", "details": [[], [], [], ..., []]}
router.post('/exams/mastersheet', (req, res) => {
    const record = req.body;
    console.log('Request body: ' + record);
    var distinct_exam_rooms = [];
    // console.log(record.details[0][0]);
    /////////////////////////////////////////////////
    // creating the date+time string
    const year = record.details[1][3].substr(6, 4);
    const month = record.details[1][3].substr(3, 2);
    const date = record.details[1][3].substr(0, 2);
    const hours = record.details[2][3].substr(0, 2); 
    const mins = record.details[2][3].substr(3, 2); 
    
    const startTime = year+"-"+month+"-"+date+"T"+hours+":"+mins+":00";
    console.log(startTime);
    /////////////////////////////////////////////////
    const name = record.details[0][2];
    // const startTime: {type: Date, required: true},  // it is a must that a exam has a start time 2023-12-10T10:00:00
    const duration = record.details[3][3];
    const course_coordinator = record.details[4][4];
    const chief_invigilator = record.details[14][5];
    const invigilator = record.details[14][6];
    const total_students = record.details[10][5];
    const students = [];
    const course = name.split(" ")[0];

    for (let i = 14; i < record.details.length; i++) {
        if(record.details[i].length ==  12) {  // skips an entire record if it doesn't have 5 fields
            const regNo = record.details[i][1];
            var eligible = false;
            if(record.details[i][2] == "TRUE") {
                eligible = true;
            }
            const exam_room = record.details[i][3];
            // adding a new distinct exam room 
            if(!distinct_exam_rooms.includes(exam_room)) 
                distinct_exam_rooms.push(exam_room); 

            // adding the new student to the students array    
            students.push({regNo, eligible, exam_room});
        }
    }
    // const response = await exams.create({name, startTime, duration, course_coordinator, chief_invigilator, invigilator, total_students, students});  // response is the return value from mongoDB
    
    
    // this is a schema method of exams
    // takes the distinct exam rooms as the arguments
    const newExam = new exams({name, startTime, duration, course_coordinator, chief_invigilator, invigilator, total_students, students, course});
    // saving the new exam
    newExam.save()
    .then(() => {
        console.log('Created new exam entry: ' + newExam);

        // calling the function to create exam rooms
        exams.addExamRooms({distinct_exam_rooms, name, students});

        res.json({status: 'Addded new exam to the database, and created the relevant exam rooms'});
    })
    .catch(err => res.status(400).json({Message: "Following error occured while trying to create new exam", Error: err}));
    // console.log('Created new exam entry : ' + response);
    /**
     * have to handle errors of => adding an already existing student, trying to add a student without a required field
     */
    // res.json({status: 'created an exam successfully!'});
});

// call to read all exams
router.get('/exams/all', (req, res) => {
    const req_body = req.body;
    console.log('Request body: ' + req_body);

    // const records = await admins.find(req_body);
    // console.log('Sending response: ' + records);

    exams.find()
    .then(result => res.json(result))
    .catch(err => res.status(400).json({Error: err }));
});

/**
 * API calls to the exam rooms collection
 */

////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;