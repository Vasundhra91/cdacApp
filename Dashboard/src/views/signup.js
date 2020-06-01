import React, { useState, useEffect }  from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import homeimg from '../image/elearning.jpg'
import Select from "react-select";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {/* <Link color="inherit" href="https://material-ui.com/"> */}
        Your Website
      {/* </Link> */}
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [course, setcourse] = useState("");
  const [Admin, setAdmin] = useState("N");
  const [returndata, setreturndata] = useState(0);
  const [selectedOption, setselectedOption] = useState(false);
  const [data, setData] = useState({label: "Loading ...", value: ""});
  const [loading, setLoading] = React.useState(true);
  const [status, setstatus] = useState("");
  const [msg , setmsg]=useState("");
  const [ profileImg, setprofileImg]=useState([]);
  const [ profileImg_data, setprofileImg_data]=useState([]);

//-----file upload-----//
function onFileChange(e) {
  setprofileImg(e.target.files[0])
  console.log(e.target.files[0]!==[])
}

function onSubmit(e) {
  e.preventDefault()
  const formData = new FormData()
  formData.append('file', profileImg)
  fetch("/uploaduserphoto/upload", {
    mode: 'no-cors',
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data; boundary=AaB03x" +
        "--AaB03x" +
        "Content-Disposition: file" +
        "Content-Type: png" +
        "Content-Transfer-Encoding: binary" +
        "...data... " +
        "--AaB03x--",
      "Accept": "application/json",
      "type": "formData"
    },
    body: formData
  }).then(res => res.json())
    .then(Img_data => setprofileImg_data(Img_data))
}

useEffect(() => {
  if(profileImg_data.length>0){
    setstatus("Picture Saved Sucessfully")
    setmsg("alert alert-success")}
},[profileImg_data])

function validateFormupload() {
  return email.length > 0 && password.length > 0 && course.length > 0 && firstName.length > 0 && lastName.length > 0;
}

///--------------------///

const validate = (email) => {
  const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

  return expression.test(String(email).toLowerCase())
}
  function validateForm() {
    return profileImg_data.length > 0 && email.length > 0 && password.length > 0 && course.length > 0 && firstName.length > 0 && lastName.length > 0;
  }
  
  function handleChange(selectedOption) {
    var id =selectedOption.value;
    setselectedOption(selectedOption);
    setcourse(id);
    
   };
   
  useEffect(() => {
    setLoading(true);
    axios
        .get("/users/coursedetails")
        .then(result => setData(result.data.map((data) => { return { value: data._id, label: data.Usercourse } })))
        setLoading(false);
}, []);

function handlecheck(event) {
  event.preventDefault();
 if (validate(email)){
  setstatus("")
  setmsg("")
  const newUser={
    Useremail:email
  }
fetch('/users/check', {
  method: 'POST',
  body: JSON.stringify(newUser),
  headers: {
      'Content-Type': 'application/json'
  }
}).then(res => res.json())
    .then(returndata => setreturndata({ returndata }))
    .catch(error => console.error('Error:', error))
}
else{
  setstatus("Email-id format is not correct")
  setmsg("alert alert-warning")  
  //setEmail("")
}
}


  function handleSubmit(event) {
    event.preventDefault();
    var tempDate = new Date();
    var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
  
    const newUser={
      Fname:firstName,
      LName:lastName,
      Useremail:email,
      Userpassword:password,
      UserAdmin: Admin,
      UserCourseID: course,
      UserPhotoID: profileImg_data,
      Inserted_date:date
    }
  
    
  fetch('/users', {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: {
        'Content-Type': 'application/json'
    }
  }).then(res => res.json())
      .then(returndata => setreturndata({ returndata }))
      .catch(error => console.error('Error:', error))
     // .then(setstatus("SignUp Sucessfully"))

   event.target.reset();
   
    
}
useEffect(() => {
if(returndata.returndata ===0){
setstatus("")
setmsg("")
//setEmail("")
}
if(returndata.returndata ===3){
  setstatus("Email-id is Already Exist")
  setmsg("alert alert-danger")  
 // setEmail("")
}
if(returndata.returndata ===1){
setstatus("Already Exist")
setmsg("alert alert-danger")

setEmail("")
setPassword("")
setfirstName("")
setlastName("")
setcourse("")
setAdmin("N")
//setreturndata(0)
setselectedOption("")
setData({label: "Loading ...", value: ""})
setLoading(true)
//setstatus("")
//setmsg("")
setprofileImg("")
setprofileImg_data([])
}
else if (returndata.returndata ===2)
{
setstatus("SignUp Sucessfully")
setmsg("alert alert-success")
}
}, [returndata])

  return (
    <div style={{backgroundImage: `url(${homeimg})`}}>
 
 <Container component="main" maxWidth="xs" style={{background:"#cce6ff"}}>
      <CssBaseline />
      <div>{returndata.id}</div>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up 
        </Typography>
       <div className={msg}> {status}</div>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={e => setfirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={e => setlastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onBlur={handlecheck}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Select isDisabled={loading} value={selectedOption} classname ="form-control input-sm" options={data}  onChange={handleChange}  />
            </Grid>
            <Grid item xs={12} style={{display:'none'}}>
              <FormControlLabel
                control={<Checkbox value="Y" color="primary" />}
                label="Admin"
                onChange={e => setAdmin(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <input type="file"
             onChange={onFileChange} 
             />
             </Grid>
             <Grid item xs={12} sm={6}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={onSubmit}
            disabled={!validateFormupload()}
          >
            Upload
          </Button>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!validateForm()}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin/" variant="body2" >
                 Do have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  </div>
  )
}
