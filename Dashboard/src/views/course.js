import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
export default function AddCourse() {
    const [data, setData] = useState([]);
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
        .then(result => setData(result.data))
        .catch(error => console.error('Error:', error));
    }
    useEffect(() => {
        axios
            .get("/users/coursedetails")
            .then(result => setData(result.data))
    }, [data]);

    return (
        <div><div style={{ paddingTop: "52px" }}>
            <Container component="main" maxWidth="xs" style={{ background: "#cce6ff" }}>
                <h2> Add Users Course</h2>
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
                        {item.Usercourse}
                    </li>
                ))}
            </ul>
            </Container>
        </div>
        </div>
    )

}