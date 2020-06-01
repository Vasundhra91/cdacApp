import React, { Component } from 'react';
import { userContext } from 'views/Logincontext'
export default class User_test extends Component {
    state = {
        users: [],
        Marks: " ",
        Result: " ",
        users_answer: [],
        selectedValue: [],
        userinfoid: ""
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
            .then(users => this.setState({ users :users}))
            .catch(error => console.error('Error:', error))
            
    }
    handleSumbmitEvent = (e) => {
        e.preventDefault();
        var totalmarks = 0;
            for (var i = 0; i < this.state.users.length; i++) {
                if (this.state.users[i].AnsweredValue === this.state.users[i].MCQ_Answer) {
                    totalmarks++;
                }
            }

        var percent = totalmarks * 100 / this.state.users.length;
        var Result = ""
        if (Math.round(percent) >= 60) {

            this.setState({ Marks: totalmarks })
            this.setState({ Result: "PASS" })
            Result = "PASS"
        }
        else {
            this.setState({ Marks: totalmarks })
            this.setState({ Result: "FAIL" })
            Result = "FAIL"
        }
        var tempDate = new Date();
        var date = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
        const newUser = {
            Ques_id: this.state.users[0].Ques_id,
            User_id: this.state.userinfoid,
            Marks: totalmarks,
            Result: Result,
            Inserted_date: date
        }
        fetch('/users/UserTestResult', {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(returndata => this.setState({ setSubmit: returndata }))
            .catch(error => console.error('Error:', error));
    }

    render() {
        
        const handleChange = event => {
            function newusers(_id, AnsweredValue, statevalue) {
            const findExistingItem = statevalue.find(item => {
                    return item._id == _id;
                });
                if (findExistingItem) {
                    findExistingItem._id = _id;
                    findExistingItem.AnsweredValue = AnsweredValue;
                }
                return statevalue
            }
            var returnvalue = newusers(event.target.name, event.target.value, this.state.users);
            this.setState({ selectedValue: returnvalue })

        };
        const MCQ_queslist = this.state.users.map(MCQ_ques => {
            return (
                <div style={{fontSize:"15px"}} key={MCQ_ques._id}>
                    <div> Question: {MCQ_ques.MCQ_ques} </div>
                    <div> Option:  </div>
                        {MCQ_ques.MCQ_option.map(function (MCQ_option, i) {
                            return <div  key={i}>
                                <input type="radio" name={MCQ_ques._id} id={i} onChange={handleChange} value={MCQ_option}/> {MCQ_option}
                                    </div>
                        })}
                           
                </div>
            )})
        return (

            <form onSubmit={this.handleSumbmitEvent}>
                <div style={{ paddingTop: "50px" }}>
                    <div className="container">
                        <div style={{ background: "#cce6ff", width: "100%" }}>
                            <h2>Test Paper</h2>
                            {MCQ_queslist}
                            <div style={{ color: 'Blue' }}>
                                <h3> {this.state.Marks} {this.state.Result}</h3>
                            </div>
                            <button className="btn btn-primary" type="submit">Submit </button>
                        </div>
                    </div></div>
            </form>
        )
    }
}