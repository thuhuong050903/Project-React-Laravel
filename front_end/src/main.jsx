import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import App_admin from './App_admin.jsx'

// import './index.css'
// import reportWebVitals from './reportWebVitals';
// import App from './App.jsx'
// import App_admin from './App_admin.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";

import AppManagement from './AppManagement';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <BrowserRouter>
    {/* <App></App> */}
    <App_admin></App_admin>
   
    {/* <App_admin></App_admin> */}

    <AppManagement></AppManagement>

    </BrowserRouter>
  </React.StrictMode>,
)