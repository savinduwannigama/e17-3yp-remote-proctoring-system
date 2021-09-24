const express = require('express');
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

// scheduling and exam
router.post('/schedule', (req, res) => {
    /**
     * add code to add a new exam to the database
     * add a auto generated id 
     * have to generate a URL/link for the meeting and store in the database
     */
});

// to get acheduled exams
router.get('/schedule', (req, res) => {
    /**
     * get all the schedules from the database
     * 
     */
    res.json(/**array containing the schedules as object*/);  //
});

// to edit a schedules exam
router.put('/schedule/:id', (req, res) => {
    /**
     * check if the schedule with the given id exists
     * edit the schedule in the database
     */
    //redirect to the home page
     res.redirect('/*path of the home page*/');  
});

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
////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;
