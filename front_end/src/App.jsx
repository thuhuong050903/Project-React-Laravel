// import { useState } from 'react'

// import './App.css'
// import {BrowserRouter as Router ,Routes,Route,useNavigationType,useLocation,} from "react-router-dom";
// import Header from './component/Common/Header';
// import Footer from './component/Common/Footer';
// import Home from './view/User/Home';
// import Introduce from './view/User/Introduce';
// import Co_Living from './view/User/Co_Living';
// import Sign_in from './component/Account/Sign_in';
// import Sign_up from './component/Account/Sign_up';
// import "bootstrap/dist/css/bootstrap.min.css";


// function App() {
//   return (
    // <div className='containers'>
    //     <Header></Header>
    //     <Routes>
    //       <Route path="/Home" element={<Home/>} />
    //       <Route path="/Introduce" element={<Introduce/>} />
    //       <Route path="/Co_Living" element={<Co_Living/>} />
    //       <Route path="/Sign_in" element={<Sign_in/>} />
    //       <Route path="/Sign_up" element={<Sign_up/>} />
    //     </Routes>
    //     <Footer></Footer>
    // </div>

//   )
// }
// export default App;

import { useState } from 'react'

import './App.css'
import {BrowserRouter as Router ,Routes,Route,useNavigationType,useLocation,} from "react-router-dom";
import Header from './component/Common/Header';
import Footer from './component/Common/Footer';
import Home from './view/User/Home';
import Introduce from './view/User/Introduce';
import Co_Living from './view/User/Co_Living';
import Sign_in from './component/Account/Sign_in';
import Sign_up from './component/Account/Sign_up';
import "bootstrap/dist/css/bootstrap.min.css";
import AuthUser from './component/AuthUser';
import List_Apartment from './view/User/List_Apartment';
import Auth from './navbar/auth';
import Detail from './view/User/Detail';
import ResetPasswordForm from './component/Account/ResetPasswordPage';
import ConfirmPasswordResetPage from './component/Account/ConfirmPasswordResetPage';
function App() {
  const {getToken} = AuthUser();
  if(!getToken()){
    return (
      <div className='containers'>
        <Header></Header>
        <Routes>
         <Route path="/Home" element={<Home/>} />
          <Route path="/Introduce" element={<Introduce/>} />
           <Route path="/Co_Living" element={<Co_Living/>} />
           <Route path='/ShowApartment' element={<List_Apartment/>}></Route>
           <Route path="/Sign_in" element={<Sign_in/>} />
           <Route path="/Sign_up" element={<Sign_up/>} />
           <Route path="/ResetPasswordForm" element={<ResetPasswordForm/>} />
           <Route path="/ConfirmPasswordResetPage" element={<ConfirmPasswordResetPage/>} />
           <Route path="/apartment/:id" element={<Detail/>} />
         </Routes>
         <Footer></Footer>
     </div>
    )
  }
  return (
    <div>
      <Auth />
               </div>
  );
}

export default App;
