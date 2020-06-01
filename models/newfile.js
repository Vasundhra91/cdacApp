var mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
let Schema = mongoose.Schema;
let userSchema = new Schema({
    'id' : String,
    'name' : String,
    'email' : String
});

userSchema.plugin(autoIncrement.plugin, {
    model: 'user',
    field: '_id',
    startAt: 100,
    incrementBy: 1
});

module.exports = Login = mongoose.model('User_test', userSchema);