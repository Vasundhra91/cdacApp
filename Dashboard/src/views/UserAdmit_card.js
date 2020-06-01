import React from 'react';
import { userContext } from 'views/Logincontext'
import Loader from "react-loader-spinner";
import './admidcardview/style.css';
import Doc from './admidcardview/DocService';
import PdfContainer from './admidcardview/PdfContainer';

class AdmitCard extends React.Component {
  state = {
    UserCourse: [],
    usersinfo: [],
    done: undefined
  }
  createPdf = (html) => Doc.createPdf(html);
  
  static contextType = userContext;
  componentDidMount() {
    const { user } = this.context
    let obj = user;
    let keys = Object.keys(obj);
    let lat = obj[keys[0]].Userdetails;
    const newUser = {
      Userid: lat._id,
      UserCourseID: lat.UserCourseID
    }
    const Userinfo = {
      name: "Name: "+lat.Fname+" "+lat.LName,
      Email: "Email: "+ lat.Useremail,
      UserPhotoID:lat.UserPhotoID
    }
    
    setTimeout(() => {
      fetch('/users/userinfo_byid', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .then(UserCourse => this.setState({ UserCourse }))
        .then(this.setState({ usersinfo: Userinfo }))
        .then(this.setState({ done: true }))
        .catch(error => console.error('Error:', error))
    }, 2000);

  }
  render() {
    
    return (
      <> <div style={{ paddingTop: "50px" }}>
        <div className="row" style={{ background: "#cce6ff", width: "100%" }}>
          <div className="container">
      
      {!this.state.done ? (
        <div style={{ paddingTop: "100px", paddingLeft: "500px" }}>
          <Loader type="Grid" color="#00BFFF" height={100} width={100} /></div>
      ) : (<>
        {this.state.UserCourse.Usercourse !== "null" ?
        (
        <>{this.state.UserCourse.Usercourse === undefined ?"":(
         <>
         <PdfContainer createPdf={this.createPdf}>
            <div><h2> Admit Card </h2></div>
            <div key={this.state.usersinfo._id}  className="row border border-primary">
                <div className="col-xl-3 col-xl-3 col-md-3 col-sm-3 col-xs-3">
                  <img style={{ width: "100px", height: "100px" }} src={"/uploaduserphoto/image/" + this.state.usersinfo.UserPhotoID} alt="Placeholder image" />
                </div>
                <div className="col-xl-5 col-xl-5 col-md-5 col-sm-5 col-xs-5">
                  <div> <h6>  {this.state.usersinfo.name}</h6> </div>
                  <div> <h6>  { this.state.usersinfo.Email} </h6> </div>
                  <div> <h6> { "Course: "+ this.state.UserCourse.Usercourse } </h6>  </div>
                  <div>
                  </div>
                </div>
            </div>
            </PdfContainer>
         </>
        )}</>)
 :
          (<> <div style={{ paddingTop: "52px" }}>
            <div className="container">
              <div style={{ background: "#cce6ff", width: "100%" }}>
                <div ><h2> Admit Card </h2></div>
                <div><h3>No Records Found.!</h3></div></div>
            </div>
          </div>
          </>) }
           </>)
      }
      </div>
      </div>
      </div>
      </>)


  }
}


export default AdmitCard;