const express = require('express');
const mongoose = require('mongoose');

// importing the mongoose models ///////////////////////////////////////////////////////////////////////////////

const proctors = require('../../models/proctors');  // importing the mongoose model for the collection 'proctors'
const students = require('../../models/students');  // importing the mongoose model for the collection 'students'
const recordings = require('../../models/recordings');  // importing the mongoose model for the collection 'recordings'

////////// student accessible collections

const courses = require('../../models/courses');  // importing the mongoose model for the collection 'courses'
const exams = require('../../models/exams');  // importing the mongoose model for the collection 'exams'
const exam_rooms = require('../../models/exam_rooms');  // importing the mongoose model for the collection 'exam_rooms'

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const router = express.Router();

////////////////////////////////////////////////////////////////////////////////////////////////////////
// APIs for the registration page
// add new user to the database
router.post('/register', (req, res) => {
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

// check whether the pin given at registration
// POST METHOD?
router.get('/checkpin', (req, res) => {
    /**
     * send the pin generated and stored in the database (where? idk)
     * UI calls this method after user enters pin, and compares the API sent key with the user entered key
     */
    res.json(/**array containing the pin as an object */);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////
// API s for the login page
/**
 * 
 */
////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////
// APIs for the Home page

// scheduling and exam (REDUNDANT --> in admin.js)
router.post('/exams', async (req, res) => {
    /**
     * add code to add a new exam to the database
     * add a auto generated id 
     * have to generate a URL/link for the meeting and store in the database
     */

    const record = req.body;
    console.log('Request body: ' + record);

    const response = await exams.create(record);  // response is the return value from mongoDB
    console.log('Created new exam: ' + response);

    res.json({status: 'Addded new exam schedule'});  // response after succcesfully creating a new exam schedule
     
});

/**
 * API calls to the exams collection
 */
// to get acheduled exams
router.get('/exams', (req, res) => {
    /**
     * get all the schedules from the database
     * 
     */
    res.json({siddiya: "menna meekai sidduya"});  //  /**array containing the schedules as object*/
});

// to edit a schedules exam
router.put('/examschedule/:id', (req, res) => {
    /**
     * check if the schedule with the given id exists
     * edit the schedule in the database
     */
    //redirect to the home page
     res.redirect('/*path of the home page*/');  
});


/**
 * API calls to the courses collection
 */
// to get the recently accessed courses
router.get('/recentcourses', (req, res) => {
    /**
     * get the recently accessed courses from the database  
     */
     res.json(/**array containing the courses as objects*/);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////
// APIs for the Dashboard page

// to get the next up coming exam
router.get('/nextexam', (req, res) => {
    /**
     * get the next exam from the database (based on the scheduled date)
     */
    res.json(/**array containg a single object relevant to the nxt upcoming exam */);
});

// to get recently held exams
router.get('/recentexams', (req, res) => {
    /**
     * to get the recently finished exams
     */
});

/**
 * API calls to the proctors collection
 */
// to read own student data (SELF)
router.get('/proctors/self/:id', (req, res) => {
    // const req_body = req.body;
    // console.log('Request body: ' + req_body);

    // const records = await admins.find(req_body);
    // console.log('Sending response: ' + records);

    proctors.findById(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(400).json("Error : " +err ));
});

/**
 * API calls the to the exams collection
 */
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
////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;
