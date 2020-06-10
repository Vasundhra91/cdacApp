import React, { useState, useEffect,useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import {courseContext} from 'views/Logincontext'
import Grid from '@material-ui/core/Grid';
export default function AddCourse() {
    const [data, setData] = useState([]);
    const [newdata, setnewData] = useState(0);
    const [check, setcheck] = useState([]);
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
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));
    const {dispatchcourse,course} = useContext(courseContext)
    const classes = useStyles();
    const [selectedcourse, setcourse] = useState("");
    function validateForm() {
        return selectedcourse.length > 0;
    }
    function handleSubmit(event) {
        event.preventDefault();
        var tempDate = new Date();
        var date = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
        const newUser = {
            Usercourse: selectedcourse,
            Inserted_date: date
        }
        fetch('/users/addcourse', {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(result => setData(result))
        .then(result => setcheck(result))
        .then(event.target.reset())
        .catch(error => console.error('Error:', error));
    }
    useEffect(() => {
        if(newdata==0)
        { dispatchcourse({type:'logout',course:""})}
        axios
            .get("/users/coursedetails")
            .then(result => setData(result.data))
    }, []);

    useEffect(() => {
        var coursedata= data.map((data) => { return { value: data._id, label: data.Usercourse } })
        setnewData(coursedata)
        if(newdata!=0 ||data.length>0)
        {
        dispatchcourse({type:'logout',course:""})
        dispatchcourse({type:'login',course:coursedata})}
        }, [data]);

    function  handleDeleteEvent(e) {
        e.preventDefault();
        
        fetch('/users/deletecourse/' + e.target.id, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(result => setData(result))
        .then(result => setcheck(""))
            .then(response => console.log('Success:', JSON.stringify(response)))
            .catch(error => console.error('Error:', error))
    }
    return (
        <div><div style={{ paddingTop: "52px" }}>
            <Container component="main" maxWidth="xs" style={{ background: "#cce6ff" }}>
                <h2> Add Users Course</h2>
               <div style={{color:"red" }}>{check==""?"Dont Write dublicate Course ":check!=""?"Data Saved successfully":""} </div> 
                <form onSubmit={handleSubmit} className={classes.form} noValidate>
                    <TextField
                        autoFocus
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="selectedcourse"
                        label="Course Name"
                        type="selectedcourse"
                        id="selectedcourse"
                        onChange={e => setcourse(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={!validateForm()}

                    >
                        Add Course
            </Button>
                </form>
            
            <ul>
                {data.map(item => (
                    <li key={item._id}>
                        <Grid container spacing={2}>
                         <Grid item  sm={6} xs={6}>{item.Usercourse}
                        </Grid>
                        <Grid item sm={6} xs={6}>
                        <button className="btn btn-info" onClick={handleDeleteEvent} color="primary" id={item._id}> Delete </button>
                        </Grid>
                        </Grid>
                    </li>
                ))}
            </ul>
            </Container>
        </div>
        </div>
    )

}