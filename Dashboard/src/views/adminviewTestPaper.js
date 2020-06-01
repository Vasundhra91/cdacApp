import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { userContext } from 'views/Logincontext'
export default class View_testPaper extends Component {
    state={
        MCQ_quesdetails:[]
    }
    static contextType = userContext;
    componentDidMount() {
        const { user } = this.context
        let obj = user;
        let keys = Object.keys(obj);
        let lat = obj[keys[0]].Userdetails;
        this.setState({ userinfoid: lat._id })
        console.log(this.props.location.state.id)
        const newUser = { Ques_id: this.props.location.state.id }
        fetch('/users/id', {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            //.then(response => console.log('Success:', JSON.stringify(response)))
            .then(MCQ_quesdetails => this.setState({ MCQ_quesdetails }))
            .catch(error => console.error('Error:', error))

    }
    render() {
        const MCQ_queslist = this.state.MCQ_quesdetails.map(MCQ_ques => {
            return (
                <div key={MCQ_ques._id}>
                    <Grid container>
                        <Grid item xs={3}>
                            <h4> Question:</h4><div> {MCQ_ques.MCQ_ques} </div></Grid>
                        <Grid item xs={3}>
                            <Grid item xs={5}><h4> Option:  </h4></Grid>
                            {MCQ_ques.MCQ_option.map(function (MCQ_option, i) {
                                return <div key={i}>
                                    <Grid item xs={7}>
                                        <span>{MCQ_option}</span>
                                    </Grid>
                                </div>
                            })}</Grid>
                        <Grid item xs={3}>
                            <h4> Answer:
                                </h4><div> {MCQ_ques.MCQ_Answer} </div>
                        </Grid>
                    </Grid>
                </div>
            )
        }
        )
        return (
            <div style={{ paddingTop: "50px" }}>
          <div className="container">
        <div  style={{ background: "#cce6ff", width: "100%" }}>
        
                {MCQ_queslist}
            </div>
            </div>
            </div>
        )
    }
}