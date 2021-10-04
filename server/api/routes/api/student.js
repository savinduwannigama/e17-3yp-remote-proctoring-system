const express = require('express');
const mongoose = require('mongoose');

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


////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

/**
 * API calls to the courses collection
 * student can only read courses
 * student can only read courses underwhich he/she has a scheduled exam
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
            res.json({status: 'failure', message: 'Error occured while trying to find the student regNo in courses.students', error: String(err)});
        });
    })
    .catch(err => {
        console.log("Error occured while trying to find the student RegNo from given ID");
        res.json({status: 'failure', message: 'Error occured while trying to find the student RegNo from given ID', error: String(err)});
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
  router.get('/exam/self/:id', (req, res) => {
    students.findById(req.params.id)
    .then(async result1 => {
        // const StudentRegNo = result1.regNo;
        await exam_rooms.find({room_students: result1.regNo})
        .then(result2 => {
            const retArray = [];
            // const tempArray = [];
            result2.forEach(room => {
                var tempArray = [];
                tempArray.push(room);
                exams.findOne({name: room.exam})
                .then(result3 => tempArray.push(result3))
                .catch(err => {
                    console.log("Error occured while trying to find the exam of the given exam_room");
                    // returns from the entire API call sending the error as the response
                    return res.json({status: failure, message: 'Error occured while trying to find the exam of the given exam_room', error: String(err)});
                });
                // adding the array [exam_room, exam] as an element to the returning array
                retArray.push(tempArray);
                // clearing the tempArray for the next iteration
                tempArray = [];
            });
            // res.json(retArray);
        })
        .catch(err => {
            console.log("Error occured while trying to find the exam_rooms for the given student regNo");
            res.json({status: 'failure', message: 'Error occured while trying to find the exam_rooms for the given student regNo', error: String(err)});
        });

        // sending the successful response to the user AFTER the above part of the program
        res.json(retArray);
    })
    .catch(err => {
        console.log("Error occured while trying to find the student RegNo from given ID");
        res.json({status: 'failure', message: 'Error occured while trying to find the student RegNo from given ID', error: String(err)});
    });
});
/////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;
