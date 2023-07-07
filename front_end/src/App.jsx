import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/Common/Header';
import Footer from './component/Common/Footer';
import "bootstrap/dist/css/bootstrap.min.css";
import { routes } from './Route';
import AdminDashboard from './view/Admin/AdminDashboard';

function App() {
  const [hasCalledApi, setHasCalledApi] = useState(false);

  useEffect(() => {
    if (!hasCalledApi) {
      axios.put('http://127.0.0.1:8000/api/update-apartment-status')
        .then(response => {
          setHasCalledApi(true);
        })
        .catch(error => {
        });
    }
  }, [hasCalledApi]);

  const user = JSON.parse(sessionStorage.getItem('user'));
  return (
    <div>
      {user && user.role === 'admin' ? (
        <div className='containers'>
          <AdminDashboard/>
          <Routes>
            {routes.adminRoutes.map(route => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
        </div>
      ) : (
        <div>
          <Header />
          <div className='containers'>
          <Routes>
            {routes.commonRoutes.map(route => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
            
          </Routes>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
