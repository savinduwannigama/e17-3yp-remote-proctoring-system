const mongoose = require('mongoose')

const adminsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},  // student names and emails are required
    password: {type: String, default: '', select: false},
    role: {type: String, required: true}

}, {collection: 'admins'})

adminsSchema.methods.matchPasswords = async function(enteredPassword) {
    // console.log();
    bcrypt.compare(enteredPassword, this.password, function(err, result) {
        return result;  // true if passwords match, else false
    });
}

adminsSchema.methods.getSignedToken = function() {
    // signing a JWT token with the user _id
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});
}

const model = mongoose.model('adminsModel', adminsSchema)

module.exports = model