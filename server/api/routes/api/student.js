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
router.post('/register', (req, res) => {  // DUMMY  
    // method to add a new entry to the user relation in the database
    /**
     * write code to add user to the database
     * there has to be 2 pages to redirect
     *          1. page to enter the authentication pin
     *          2. another page if the user already exists
     */

    // redirecting to the login page after a successful registration
    res.redirect('/*path of the page to redirect to after regitering */'); 
});

// add a new device to the database
router.post('/devices', async (req, res) => {
    // method to add a new entry to the user relation in the database
    /**
     * write code to add device to the database
     */

    const record = req.body;
    console.log('Request body: ' + record);
    
    const response = await devices.create(record);  // response is the return value from mongoDB
    console.log('Created new device entry: ' + response);
 
    res.json({status: 'Addded new device to the database'});  // response after succcesfully creating a new exam schedule


    // redirecting to the login page after a successful registration
    // res.redirect('/*path of the page to redirect to after regitering */'); 
});

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
/////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;
