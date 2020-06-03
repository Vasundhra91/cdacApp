import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import Grid from '@material-ui/core/Grid';
export default function AddCourse() {
    const [data, setData] = useState([]);
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
    const classes = useStyles();
    const [course, setcourse] = useState("");
    function validateForm() {
        return course.length > 0;
    }
    function handleSubmit(event) {
        event.preventDefault();
        var tempDate = new Date();
        var date = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
        const newUser = {
            Usercourse: course,
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
        axios
            .get("/users/coursedetails")
            .then(result => setData(result.data))
    }, []);

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
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="course"
                        label="Course Name"
                        type="course"
                        id="course"
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