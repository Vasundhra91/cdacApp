const LoginModel = require('../models/login_model')


const loginCheck=(req,res )=>{
  let check = new Promise((resolve,reject)=>
{
  var query = { Useremail: req.body.Useremail };
  LoginModel.findOne(query, function (error, datavalue) {
    if (datavalue !== null) {
      resolve("3")
      //console.log(res.send("3"))
    }else{
      reject("0")
    }
    check.then((value)=>{
      res.send(value);
    }).catch((value)=>{
      res.send(value);
    })
  })
}
)
   
}
const signup= function (req, res) {
    var query = { Useremail: req.body.Useremail };
    LoginModel.findOne(query, function (error, datavalue) {
      if (error) { throw error }
      if (datavalue === null) {
        LoginModel.create(req.body).then(function (data) {
          {
            res.send("2");
          }
        })
      } else {
        console.log("Already Exit")
        res.send("1");
      }
    })
  }
  const signin =  function (req, res) {
    const { Useremail, Userpassword } = req.body;
    var query = { Useremail: Useremail, Userpassword: Userpassword };
    LoginModel.findOne(query, function (err, user) {
      if (err) {
        console.error(err);
        // res.status(500)
        //   .json({
        //     res: 'Internal error please try again'
        //   });
        res.send("1");
      } else if (!user) {
        // res.status(401)
        //   .json({
        //     res: 'Incorrect email or password'
        //   });
        res.send("1");
      }
      else {
       
        res.json(user);
        // res.send(JSON.stringify(user.Fname + " " + user.LName+"-"+user._id+"-"+user.UserAdmin))
      }
    })
  }
module.exports={
    signin,
    signup,
    loginCheck
}