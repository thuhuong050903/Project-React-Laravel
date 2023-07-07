import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import User_profile from './view/User/UserProfile.jsx'
// import './index.css'
// import reportWebVitals from './reportWebVitals';
// import App from './App.jsx'
// import App_admin from './App_admin.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
  </React.StrictMode>,
)