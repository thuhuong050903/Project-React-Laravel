import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import App_admin from './App_admin.jsx'
import UploadImage from './component/UploadImage.jsx'
// import './index.css'
// import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    {/* <App></App> */}
    {/* <App_admin></App_admin> */}
    <UploadImage></UploadImage>
    </BrowserRouter>
  </React.StrictMode>,
)
// reportWebVitals();