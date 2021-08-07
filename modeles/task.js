//reference to mongoose
const mongoose = require('mongoose');

//define the schema for the project
var  TaskSchema = new mongoose.Schema({
    task:{
        type: String,
        required: true
    },
    startDate:{
        type: Date,
    },
    endDate:{
        type: Date,
    }
});
//export the schema so it become visible for controller
module.exports = mongoose.model('Task',TaskSchema);