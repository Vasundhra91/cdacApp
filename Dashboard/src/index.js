import React from "react";
import ReactDOM from "react-dom";
//import { createBrowserHistory } from "history";
//import { Router, Route, Switch, Redirect } from "react-router-dom";
import {UserContextProvider} from '../src/views/Logincontext'
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.1.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import './Custom.css';
//import AdminLayout from "layouts/Admin.jsx";
import Home from "views/login";
//const hist = createBrowserHistory();

ReactDOM.render(<UserContextProvider><Home/></UserContextProvider>,document.getElementById("root")
);
