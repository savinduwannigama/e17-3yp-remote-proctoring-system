const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const proctorsSchema = new mongoose.Schema({
    name: {type: String, required: true},  // used as the PK for now | must change PK to email
    email: {type: String, required: true, unique: true},
    password: {type: String, default: '', select: false}
    
}, {collection: 'proctors'})

// const model = mongoose.model('proctorsModel', proctorsSchema)


proctorsSchema.methods.matchPasswords = async function(enteredPassword) {
    // console.log();
    bcrypt.compare(enteredPassword, this.password, function(err, result) {
        return result;  // true if passwords match, else false
    });
}

proctorsSchema.methods.getSignedToken = function() {
    // signing a JWT token with the user _id
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});
}

const model = mongoose.model('proctorsModel', proctorsSchema)
module.exports = model

