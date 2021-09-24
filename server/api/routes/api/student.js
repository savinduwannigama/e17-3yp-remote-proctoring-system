const express = require('express');
const router = express.Router();

// importing the mongoose models ///////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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


/////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;
