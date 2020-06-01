import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Select from "react-select";
class AddQuestion extends React.Component {
    state = {
        MCQ_option: [],
        MCQ_ques: [],
        MCQ_Answer: [],
        Ques_id: Math.random(),
        selectedOption: "",
        selectedlabel:"",
        data: { label: "Loading ...", value: "" },
        loading: true,
        classes: makeStyles(theme => ({
            paper: {
                marginTop: theme.spacing(8),
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            },
            root: {
                '& .MuiTextField-root': {
                    margin: theme.spacing(1),
                    width: '25ch',
                },
            },
            form: {
                width: '100%', // Fix IE 11 issue.
                marginTop: theme.spacing(1),
            },
            submit: {
                margin: theme.spacing(3, 0, 2),
            },
        }))
    }
    validateForm() {
        return this.state.selectedOption.length > 0 && this.state.MCQ_ques.length > 0 && this.state.MCQ_Answer.length > 0 && this.state.MCQ_option.length > 0;
    }
    componentDidMount() {
        axios
            .get("/users/coursedetails")
            .then(result => this.setState({ data: result.data.map((data) => { return { value: data._id, label: data.Usercourse } }) }))

        this.setState({ loading: false })
    }
    handleChange = selectedOption => {
        this.setState({ selectedOption: selectedOption.value });
        this.setState({ selectedlabel: selectedOption.label });
        this.setState({ loading: true })
    };
    handleEvent = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSumbmitEvent = (e) => {
        e.preventDefault();
        //  var data1 = "";
        if (this.state.MCQ_option !== "" && this.state.MCQ_ques !== "") {
            var optionid = this.state.MCQ_option.split(',');
            //var MCQ_queslist = ''
            let jsonObj = []

            for (var i = 0; i < optionid.length; i++) {
                // MCQ_queslist = MCQ_queslist + ',' + '"' + optionid[i] + '"'
                jsonObj.push(optionid[i])
            }
            var tempDate = new Date();
            var date = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();

            //data1 = '{"Ques_id":' + '"'+this.state.Ques_id+'"'+ ',"MCQ_Answer":' + '"'+this.state.MCQ_Answer+'"'+ ',"MCQ_ques":' + '"'+this.state.MCQ_ques+'"'+ ',"User_id":' +0+ ',"Result":' + '"'+"null"+'"'+ ',"MCQ_option":{"option":[ '+ MCQ_queslist.substr(1) + ']}}';
            var newdata = {
                Ques_id: this.state.Ques_id,
                MCQ_Answer: this.state.MCQ_Answer,
                MCQ_ques: this.state.MCQ_ques,
                UserCourseName:this.state.selectedlabel,
                MCQ_option: jsonObj,
                AnsweredValue: '',
                UserCourseID: this.state.selectedOption,
                Inserted_date: date

            }
            console.log(newdata)
            this.props.AddDetails(newdata)
            e.target.reset();
            this.setState({
                MCQ_option: "",
                MCQ_ques: "",
                MCQ_Answer: ""
                // loading: false
            })
        }
    }
    render() {
        const { selectedOption } = '';
        return (
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <div className={this.state.classes.paper}>
                    <Typography component="h1" variant="h5" style={{ paddingTop: "15px" }}>
                        Add Test Paper
              </Typography>
                    <form onSubmit={this.handleSumbmitEvent} style={{ paddingTop: "25px" }}>

                        <div className="row">
                            <div className="col-lg-2 col-xl-2 col-md-4 col-sm-4">
                                Course:
</div><div className="col-lg-2 col-xl-2 col-md-4 col-sm-4">
                                <Select value={selectedOption} isDisabled={this.state.loading} classname="form-control input-sm" options={this.state.data} onChange={this.handleChange} placeholder="Course Selection" />

                            </div>
                        </div>
                        <Grid container style={{ paddingTop: "15px", paddingRight: "15px" }}>
                            <Grid item style={{ paddingRight: "15px" }}>
                                <TextField id="MCQ_ques" label="Question" multiline rows={4} placeholder="Ques" variant="outlined" onChange={this.handleEvent} />
                            </Grid>

                            <Grid item style={{ paddingRight: "15px" }}>
                                <TextField id="MCQ_option" onChange={this.handleEvent} label="Option" multiline rows={4} placeholder="Write Option with comma separated" variant="outlined" />
                            </Grid>

                            <Grid item style={{ paddingRight: "15px" }}>
                                <TextField id="MCQ_Answer" onChange={this.handleEvent} label="Answer" multiline rows={4} placeholder="Answer." variant="outlined"  />
                            </Grid>

                            <Grid item>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary" disabled={!this.validateForm()} >Add Ques. </Button>

                            </Grid>

                        </Grid>

                    </form>
                </div>
            </Container>
        )
    }
}

export default AddQuestion;
