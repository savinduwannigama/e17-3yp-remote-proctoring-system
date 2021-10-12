const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const studentsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    regNo: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},  // student names and emails are required
    password: {type: String, default: '', select: false},
    department: {type: String, default: ''},
    // relationship with the devices (HAS)
    device: {type: String, default: 'No device given'}  // FK | maps to the device that the student has

}, {collection: 'students'})


studentsSchema.methods.matchPasswords = async function(enteredPassword) {
    // console.log();
    bcrypt.compare(enteredPassword, this.password, function(err, result) {
        return result;  // true if passwords match, else false
    });
}

studentsSchema.methods.getSignedToken = function() {
    // signing a JWT token with the user _id
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});
}


const model = mongoose.model('studentsModel', studentsSchema)

module.exports = model