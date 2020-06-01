var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var modelschema = new Schema({
    Usercourse: {
        type: String
    },
    Inserted_date: {
        type: String
    }
    
})

module.exports = UserCourse = mongoose.model('UserCourse', modelschema);