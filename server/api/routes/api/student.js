const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// importing the mongoose models ///////////////////////////////////////////////////////////////////////////////

const students = require('../../models/students');  // importing the mongoose model for the collection 'students'
const courses = require('../../models/courses');  // importing the mongoose model for the collection 'courses'
const exams = require('../../models/exams');  // importing the mongoose model for the collection 'exams'
const exam_rooms = require('../../models/exam_rooms');  // importing the mongoose model for the collection 'exam_rooms'
const recordings = require('../../models/recordings');  // importing the mongoose model for the collection 'recordings'

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const router = express.Router();

/////////////////////////////////////////////////////////////////////////////////////////
// router.post('/register', (req, res) => {  // DUMMY  
//     // method to add a new entry to the user relation in the database
//     /**
//      * write code to add user to the database
//      * there has to be 2 pages to redirect
//      *          1. page to enter the authentication pin
//      *          2. another page if the user already exists
//      */

//     // redirecting to the login page after a successful registration
//     res.redirect('/*path of the page to redirect to after regitering */'); 
// });

// // add a new device to the database
// router.post('/devices', async (req, res) => {
//     // method to add a new entry to the user relation in the database
//     /**
//      * write code to add device to the database
//      */

//     const record = req.body;
//     console.log('Request body: ' + record);
    
//     const response = await devices.create(record);  // response is the return value from mongoDB
//     console.log('Created new device entry: ' + response);
 
//     res.json({status: 'Addded new device to the database'});  // response after succcesfully creating a new exam schedule


//     // redirecting to the login page after a successful registration
//     // res.redirect('/*path of the page to redirect to after regitering */'); 
// });

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

/**
 * API calls for registration
 * astudent emails and detailt will be added by the admin
 * when astudent tries to register --> check DB for given email
 * if email exists --> astudent can add a password of his/her choice.
 * student setting a password is considered as registering
 */

// API call to register student
router.post('/register', (req, res) => {
    const {email, password0, password1} = req.body;

    // let errors = [];

    // checking of required fields is done by the frontend

    // checking this just incase because suri is dumb
    if(password0 != password1) {
        // errors.push({msg: 'Passwords do not match'});
        res.status(400).json({status: 'failure', message: 'Entered passwords do not match'})  // CHECK THE STATUS CODE
    }
    else {
        // validation passed
        students.findOne({email})  // finds the student by email
        .then(student => {
            if(student) {  // given email exists as a student
                // checks whether the email is set or not. to check whether the student has already registered or not
                if(student.password == '') {  // student not yet register
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(password0, salt, (err, hash) => {
                            if(err) throw err;  // HANDLE WHAT HAPPENS HERE
                            // setting student's password to hashed value
                            student.password = hash;
                            // saving the student with the new password hash
                            student.save()
                            .then(() => {
                                // success
                                res.json({status: 'success', message: 'Student is now registered'});
                            })
                            .catch(err => {
                                res.status(400).json({status: 'failure', message: 'Error occured while trying to save the password hash', error: String(err)})  // CHECK THE STATUS CODE
                            }); 
                        })
                    })
                }
                else {  // student has already registered
                    res.status(400).json({status: 'failure', message: 'Student has already been registered'})  // CHECK THE STATUS CODE
                }

            }
            else {  // no user with the given email is entered as a student by the admin
                res.status(400).json({status: 'failure', message: 'The email has not been assigned as a student by the admin'})  // CHECK THE STATUS CODE
            }
        })
        .catch(err => {
            res.status(400).json({status: 'failure', message: 'Error occured while trying to find the student with the given email', error: String(err)})  // CHECK THE STATUS CODE
        });
    }

});



////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

/**
 * API calls to students collections
 */
// to read own student data (SELF)
router.get('/students/self/:id', (req, res) => {
    // const req_body = req.body;
    // console.log('Request body: ' + req_body);

    // const records = await admins.find(req_body);
    // console.log('Sending response: ' + records);

    students.findById(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(400).json("Error : " +err ));
});

// API call to update self info
router.put('/students/self/:id', (req, res) => {
    students.findById(req.params.id)
    .then(student => {
        student.name = req.body.name;
        student.regNo = req.body.regNo;
        student.email = req.body.email;
        student.department = req.body.department;    
        student.device = req.body.device;    

        student.save()
        .then(() => res.json({status: 'success', message: 'Updated the student info', updatedEntry: student}))
        .catch(err => res.status(400).json({status: 'failure', message: 'Error occured while trying to save the updated entry', error: String(err)}));
    })
    .catch(err => res.status(400).json({status: 'failure', message: "Error occured while trying to read self student record", error: String(err)}));
});
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

/**
 * API calls to the courses collection
 * student can only read courses
 * student can only read courses underwhich he/she has a scheduled exam
 * response --> [{course}, {}, {}]
 */
router.get('/courses/self/:id', (req, res) => {
    students.findById(req.params.id)
    .then(result1 => {
        // const StudentRegNo = result1.regNo;
        courses.find({students: result1.regNo})
        .then(result2 => {
            // sends an array of courses to which the student has/had an scheduled exam
            res.json(result2);
        })
        .catch(err => {
            console.log("Error occured while trying to find the student regNo in courses.students");
            res.status(400).json({status: 'failure', message: 'Error occured while trying to find the student regNo in courses.students', error: String(err)});
        });
    })
    .catch(err => {
        console.log("Error occured while trying to find the student RegNo from given ID");
        res.status(400).json({status: 'failure', message: 'Error occured while trying to find the student RegNo from given ID', error: String(err)});
    });
});


////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

 /**
  * API calls to exams collection
  * student can only read exams
  * student can only read scheduled exam which he/she is in
  */
 // call to get student's exams
 // response --> {retArray: [[{exam_room}, {exam}], [], ..., []]}
  router.get('/exams/self/:id', (req, res) => {
    const retArray = [];
    students.findById(req.params.id)  // the student with the given id will always be in the students collection
    .then(result1 => {
        // console.log('result1.regNo: ' + result1.regNo);
        // const StudentRegNo = result1.regNo;
        exam_rooms.find({"room_students.regNo": result1.regNo})
        .then(result2 => {
            if(result2.length == 0) {  // checking if the student has no exams (checking whether the number of relevant exam_rooms == 0)
                res.json([]);
            }
            else {
                // console.log('result2: ' + result2);
                // const tempArray = [];
                const numberOfRooms = result2.length;
                var itrCount = 0;
                var tempArray = [];
                // console.log(numberOfRooms);
                result2.forEach(room => {
                    tempArray.push(room);
                    exams.findOne({name: room.exam})
                    .then(result3 => {
                        tempArray.push(result3);
                        // adding the array [exam_room, exam] as an element to the returning array
                        retArray.push(tempArray);
                        // clearing the tempArray for the next iteration
                        tempArray = [];  
                        itrCount++;
                        // console.log('hererererere');
                        if(itrCount >= numberOfRooms)  // sends the response if the loop has iterated once for each room
                            res.json(retArray);
                    })
                    .catch(err => {
                        console.log("Error occured while trying to find the exam of the given exam_room:\n" + err);
                        // returns from the entire API call sending the error as the response
                        // return res.json({status: failure, message: 'Error occured while trying to find the exam of the given exam_room', error: String(err)});
                    });
                    // // adding the array [exam_room, exam] as an element to the returning array
                    // retArray.push(tempArray);
                    // clearing the tempArray for the next iteration
                    // tempArray = [];
                    // res.json(retArray);
                });
                // sending the successful response to the user AFTER the above part of the program
                // res.json(retArray);
                // res.json(retArray);
                }
        })
        .catch(err => {
            console.log("Error occured while trying to find the exam_rooms for the given student regNo");
            res.status(400).json({status: 'failure', message: 'Error occured while trying to find the exam_rooms for the given student regNo', error: String(err)});
        });
    })
    .catch(err => {
        console.log("Error occured while trying to find the student RegNo from given ID");
        res.status(400).json({status: 'failure', message: 'Error occured while trying to find the student RegNo from given ID', error: String(err)});
    });
});
/////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;
