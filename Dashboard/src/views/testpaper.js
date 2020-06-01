import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col } from "reactstrap";
import { userContext } from 'views/Logincontext'
import Loader from "react-loader-spinner";
export default class User_paper extends Component {
    state = {
        testpaper: [],
        Ques_id: "",
        DeletedQues_id: false,
        visiblebutton: true,
        admin: "Y",
        done: undefined,
        buttontext:"",
        loading:undefined
    }
    static contextType = userContext;
    componentDidMount() {
        const { user } = this.context
        let obj = user;
        let keys = Object.keys(obj);
        let lat = obj[keys[0]].Userdetails;
        this.setState({ admin: lat.UserAdmin })
        //let userinfo=  this.props.location.state.Name
        // userinfo =userinfo.split('-')
        // this.setState({ Username: userinfo[0] })
        if (lat.UserAdmin === "N") {
            this.setState({buttontext:"Procced for test"})
            const newUser = {
                Userid: lat._id,
                UserCourseID: lat.UserCourseID
            }
            this.setState({ visiblebutton: false })
            setTimeout(() => {
            fetch('/users/UserTestPaper', {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(testpaper => this.setState({ testpaper }))
                .then(this.setState({ done: true }))
                .catch(error => console.error('Error:', error))
            }, 500);
        } else {
            this.setState({buttontext:"View test"})
            const newUser = {
                Userid: lat._id
            }
            setTimeout(() => {
            fetch('/users/AdminTestPaper', {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(testpaper => this.setState({ testpaper }))
                .then(this.setState({ done: true }))
                .catch(error => console.error('Error:', error))
            }, 1000);
        }
    }

    handleSumbmitEvent = (e) => {
        e.preventDefault();
        this.setState({ Ques_id: e.target.id })
    }
    handleDeleteEvent = (e) => {
        e.preventDefault();
        this.setState({ DeletedQues_id: true });
        fetch('/users/deletetest_paper/' + e.target.id, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(testpaper => this.setState({ testpaper }))
            .then(response => console.log('Success:', JSON.stringify(response)))
            .catch(error => console.error('Error:', error))
    }
    render() {
       console.log(this.state.testpaper)
        return (
            <>{!this.state.done ? (
                <div style={{ paddingTop: "100px", paddingLeft:"500px" }}>
                     <Loader type="Grid" color="#00BFFF" height={100} width={100} /></div>
            ) : (<>
                {this.state.testpaper == 0 ? (
                    <div style={{ paddingTop: "50px" }}>
                        <div className="row" style={{ background: "#cce6ff", width: "100%" }}>
                            <div className="container">
                                <h3>No Test Paper Uploaded!!</h3>
                            </div>
                        </div></div>) 
                        : 
                        (<>{this.state.Ques_id !== ""?(
                        <>
                        { this.state.admin === "N"?
                        (<Redirect to={{
                            pathname: "/admin/User_test",
                            state: { id: this.state.Ques_id }
                        }} />)
                        :
                     (<Redirect to={{
                        pathname: "/admin/ViewQuesPaper",
                        state: { id: this.state.Ques_id }
                    }} />
                    )}</>
                    ):(
                            <div style={{ paddingTop: "50px" }}>
                                <div className="row" style={{ background: "#cce6ff", width: "100%" }}>
                                    <div className="container">
                                        {this.state.testpaper.map(MCQ_ques => {
                                            return (
                                                <div key={MCQ_ques.Ques_id}>
                                                    <div>
                                                        <Row>
                                                            <Col md="12">
                                                                <Card>
                                                                    <CardHeader>
                                                                        <CardTitle tag="h4">Question Paper for {MCQ_ques.UserCourseName}</CardTitle>
                                                                    </CardHeader>
                                                                    <CardBody>
                                                                        <Table >
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td>  <button className="btn btn-primary" type="submit" id={MCQ_ques.Ques_id} onClick={this.handleSumbmitEvent}> {this.state.buttontext} </button></td>
                                                                                    <td style={{ display: (this.state.visiblebutton ? 'block' : 'none') }}>
                                                                                        <button className="btn btn-primary" type="submit" id={MCQ_ques.Ques_id} onClick={this.handleDeleteEvent}> Delete </button>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </Table>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            )
                                        }

                                        )}
                                    </div>
                                </div>
                                </div> )}</>) }</>
            )}</>)

     
                                    }
}