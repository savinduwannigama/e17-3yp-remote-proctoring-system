const mongoose = require('mongoose')

const recordingsSchema = new mongoose.Schema({
    date: {type: Date, default: Date.now}
}, {collection: 'recordings'})

const model = mongoose.model('recordingsModel', recordingsSchema)

module.exports = model