//reference to mongoose
const mongoose = require('mongoose');

//define the schema for the project
var  participantSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    }
});
//export the schema so it become visible for controller
module.exports = mongoose.model('Participant',participantSchema);