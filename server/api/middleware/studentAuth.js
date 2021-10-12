require('dotenv').config({path: './studentSecret.env'});  // adding the variables in secret.env to environment variables
const jwt = require('jsonwebtoken');

const students = require('../models/students');

exports.protectStudent = (req, res, next) => {
    let token;
    token = req.headers.authorization;
    const tokenId = token.split(" ")[1];

    if(!token) {  // if authorization header is missing in the request
        return res.status(400).json({status: 'failure', meassage: 'Authorization header is missing in the request'});;
    }  // HAVE TO BE return response ?????

    try{
        const decoded = jwt.verify(tokenId, proccess.env.JWT_SECRET);  // synchronous function
        console.log(decoded);

        students.findById(decoded.id)
        .then(student => {
            if(!student)
                return res.status(400).json({status: 'failure', meassage: 'Student with the given token does not exist'});
            
            req.student = student;
            next();
        })
        .catch(err => res.status(400).json({status: 'failure', message: 'Error occured while trying to find student during authentication'}));

    }
    catch(error) {
        res.status(400).json({status: 'failure', message: 'Error occured while trying to to verify token', error});
    }
}