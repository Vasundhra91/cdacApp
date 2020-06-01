import React from 'react';
import {  BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import  HomePage  from '../views/Home';
import  LoginPage from '../views/login';
import SignupPage from "../views/signup";
import AdminPage from "../views/Admin";
import User_test from "../views/User_test";
import AdminTestPaperPage from "../views/testpaper";
import uploadMaterialfile from "../views/uploadMaterialfile";
import UserAdmit_card from "../views/UserAdmit_card";
import Usercourse from "../views/course";

function App() {
  
    return (
        <div >
            <div className="container">
                <div className="col-md-8 offset-md-2">
                    
                    <Router >
                        <Switch>
                            <Route exact path="/" component={LoginPage} />
                            <Route path="/admin/home" component={HomePage} />
                            <Route path="/admin/SignupPage" component={SignupPage} />
                            <Route path="/admin/AdminPage" component={AdminPage} />
                            <Route path="/admin/User_test" component={User_test} />
                            <Route path="/admin/AdminTestPaperPage" component={AdminTestPaperPage} />
                            <Route path="/admin/UploadTestFile" component={uploadMaterialfile} />
                            <Route path="/admin/UserAdmit_card" component={UserAdmit_card} />
                            <Route path="/admin/course" component={Usercourse} />
                            <Redirect from="*" to="/" />
                        </Switch>
                    </Router>
                </div>
            </div>
        </div>
    );
}

export default App ;