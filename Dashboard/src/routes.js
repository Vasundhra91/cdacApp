import home from "views/Home.js"
import SigninPage from "views/login"
 import SignupPage from "views/signup"
 import AdminPage from "views/Admin"
 import User_test from "views/User_test"
 import AdminTestPaperPage from "views/testpaper"
import uploadMaterialfile from "views/uploadMaterialfile"
import UserAdmit_card from "views/UserAdmit_card"
import Usercourse from "views/course"
import ViewQuesPaper from "views/adminviewTestPaper"
//import test from "views/test"
var routes = [
  {
    path: "/home",
    name: "Home",
    icon: "nc-icon nc-caps-small",
    component: home,
    layout: "/admin",
    visible:true,
    display:"home"
   },
  {
    path: "/SigninPage",
    name: "Sign In",
    icon: "nc-icon nc-caps-small",
    component: SigninPage,
    layout: "/admin",
    visible:true,
    display:true
  }
  ,
  {
    path: "/SignupPage",
    name: "Sign Up",
    icon: "nc-icon nc-caps-small",
    component: SignupPage,
    layout: "/admin",
    visible:true,
    display:true
  },
  {
    path: "/AdminPage",
    name: "Add Test Paper",
    icon: "nc-icon nc-caps-small",
    component: AdminPage,
    layout: "/admin",
    visible:true,
    display:"admin"
  },
  {
    path: "/User_test",
    name: "User Page",
    icon: "nc-icon nc-caps-small",
    component: User_test,
    layout: "/admin",
    visible:false,
    display:"user"
  },
  {
    path: "/ViewQuesPaper",
    name: "View Ques Paper",
    icon: "nc-icon nc-caps-small",
    component: ViewQuesPaper,
    layout: "/admin",
    visible:false,
    display:"admin"
  },
  {
    path: "/AdminTestPaperPage",
    name: "Test Paper Page",
    icon: "nc-icon nc-caps-small",
    component: AdminTestPaperPage,
    layout: "/admin",
    visible:true,
    display:"both"
  }
  ,
  {
    path: "/UploadTestFile",
    name: "Test Materials",
    icon: "nc-icon nc-caps-small",
    component: uploadMaterialfile,
    layout: "/admin",
    visible:true,
    display:"both"
  },
  {
    path: "/UserAdmit_card",
    name: "Admit_card",
    icon: "nc-icon nc-caps-small",
    component: UserAdmit_card,
    layout: "/admin",
    visible:true,
    display:"user"
  },
  {
    path: "/course",
    name: "Usercourse",
    icon: "nc-icon nc-caps-small",
    component: Usercourse,
    layout: "/admin",
    visible:true,
    display:"admin"
  }
  // ,
  // {
  //   path: "/test",
  //   name: "test",
  //   icon: "nc-icon nc-caps-small",
  //   component: test,
  //   layout: "/admin",
  //   visible:true,
  //   display:"both"
  // }
  
];
export default routes;
