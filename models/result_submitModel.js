var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var modelschema = new Schema({
    User_id:{
        type:String
    },
    Ques_id:{
        type:String
    },
    Marks: {
        type: String
    },
    Result: {
        type: String
    },
    Inserted_date: {
        type: String
    }
    
})

module.exports = TestResult = mongoose.model('TestResult', modelschema);