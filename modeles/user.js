const mongoose = require('mongoose')

const plm = require('passport-local-mongoose')



var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    authID: String,
    authProv: String,
    created: Date
})

userSchema.plugin(plm)

module.exports = mongoose.model('User', userSchema)