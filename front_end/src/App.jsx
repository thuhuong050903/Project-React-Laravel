import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/Common/Header';
import Footer from './component/Common/Footer';
import "bootstrap/dist/css/bootstrap.min.css";
import { routes } from './Route';
import AdminDashboard from './view/Admin/AdminDashboard';

function App() {
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
