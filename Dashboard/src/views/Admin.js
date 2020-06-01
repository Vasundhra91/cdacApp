import React from 'react'
import ViewAddMCQGrid from "./ViewAddMCQGrid.js";
import Addques from "./AddQues.js";
import Button from '@material-ui/core/Button';
//import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

class Admin extends React.Component {
    state={
        MCQ_ques :[],
        setSubmit:[],
        labelmsg:"", 
        Username:""
        }
    
        validateForm() {
            return this.state.MCQ_ques.length > 0 ;
        }
    AddMCQDetails = (Questext) => { //add input id
        Questext.id = Math.random();
        // add all value in Array
        
        let ques = [...this.state.MCQ_ques, Questext]
        this.setState({
            MCQ_ques: ques
        })
        console.log(this.state.MCQ_ques)
    }
    DeleteMCQ_ques = (id) => {
        let MCQ_ques = this.state.MCQ_ques.filter(maap => {
            return maap.id !== id
        })
        this.setState({
            MCQ_ques: MCQ_ques
        })
        
    }

    handleAddtoDb = (e) => {
        e.preventDefault();
        fetch('/users/Admin', {
            method: 'POST',
            body: JSON.stringify(this.state.MCQ_ques),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(returndata =>this.setState({setSubmit: returndata }))
        .catch(error => console.error('Error:', error));
        this.setState({MCQ_ques:[], labelmsg:"Data Save Successfully"})
    }
    render() {
        if(this.state.setSubmit===true)
        {
            window.location.reload(true);
        }
        else{
            return (<div style={{ paddingTop: "50px" }}>
                <div style={{background:"#cce6ff"}}>
                   {this.state.labelmsg!==""?<div className="alert alert-success" role="alert">{this.state.labelmsg}</div>
                  :""}   {/* <label id="lbl_success" value={this.state.labelmsg}></label> */}
                    <Addques AddDetails ={this.AddMCQDetails} />
                    <ViewAddMCQGrid MCQ_quesdetails={this.state.MCQ_ques} DeleteMCQ_quesdetails={this.DeleteMCQ_ques} />
                    <form onSubmit={this.handleAddtoDb}>
                        <div className="col-lg-1 col-xl-1 col-md-2 col-sm-2">
                    <Button disabled={!this.validateForm()} type="submit" fullWidth variant="contained" color="primary">SAVE</Button>
                    </div>
                    </form>
                </div>
                </div>
            )
        }
      
        ;
    }
}
export default Admin