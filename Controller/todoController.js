//using app.js 
module.exports = function (app) {
    var mongoose = require('mongoose');
    var bodyParser = require('body-parser')
    app.use(bodyParser.json());
    //const getdata = require(__dirname + '../../routes/users.js');
    app.use(bodyParser.urlencoded({
        extended: false
        }));
        app.enable('trust proxy');
    const config = require(__dirname + '../../ConfigFile/config.js').connectionstring;
try{
    mongoose.connect(config)
        .then(() => console.log('database Connected')).catch(error => console.log(error));
}catch(error)
{throw error}
    //app.use('/users', getdata);

}