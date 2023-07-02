import { useState } from 'react'
import {BrowserRouter as Router ,Routes,Route,useNavigationType,useLocation,} from "react-router-dom";
import Dashboard from './view/Admin/AdminDashboard'
import List_apartment from './view/Admin/AdminListApartment';
import List_seeder from './view/Admin/AdminListSeeder';
import List_user from './view/Admin/AdminListUser';
import List_address from './view/Admin/AdminListAddress';
import SeederApartmentsPage from './view/Admin/SeederApartmentsPage';
import List_contract from './view/Admin/AdminListContract';
function AppAdmin() {
  return (
    <div className='containers'>
        <Dashboard> </Dashboard>
        <Routes>
            <Route path="/List_apartment" element={<List_apartment/>} />
            <Route path="/List_seeder" element={<List_seeder/>} />
            <Route path="/List_user" element={<List_user/>} />
            <Route path="/List_address" element={<List_address/>} />
            <Route path="/List_contract" element={<List_contract/>} />
            <Route path="/SeederApartmentsPage/:id" element={<SeederApartmentsPage/>}/>
        </Routes> 
              
    </div>
  )
}
export default AppAdmin;