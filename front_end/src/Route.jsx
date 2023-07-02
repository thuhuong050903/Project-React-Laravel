import Home from './view/User/Home';
import Service from './view/User/Service';
import Introduce from './view/User/Introduce';
import CoLiving from './view/User/CoLiving';
import SignIn from './component/Account/SignIn';
import SignUp from './component/Account/SignUp';
import AppAdmin from './AppAdmin';
import AdminListApartment from './view/Admin/AdminListApartment';
import AdminDashboard from './view/Admin/AdminDashboard';
import AdminListAddress from './view/Admin/AdminListAddress';
import AdminListUser from './view/Admin/AdminListUser';
import Detail from './view/User/Detail';
import ResetPasswordForm from './component/Account/ResetPasswordPage';
import ConfirmPasswordResetPage from './component/Account/ConfirmPasswordResetPage';
import DashboardManagement from './view/Management/DashboardManagement';
import AdminListSeeder from './view/Admin/AdminListSeeder';
import AdminListContract from './view/Admin/AdminListContract';
import SeederApartmentsPage from './view/Admin/SeederApartmentsPage';
import ShowAllApartments from './view/User/ShowAllApartments';
import UserProfile from './view/User/UserProfile';


// const lessorRoutes = [
//     { path: "/lessor/dashboard", element: <DashboardManagement /> },
//     { path: "/lessor/apartments", element: <LessorApartments /> },
//     { path: "/lessor/bookings", element: <LessorBookings /> },
//   ];
  
  // Admin Routes
  const adminRoutes = [
    { path: "/admin/dashboard", element: <AdminDashboard /> },
    { path: "/admin/list-users", element: <AdminListUser /> },
    { path: "/admin/list-seeders", element: <AdminListSeeder /> },
    { path: "/admin/list-contracts", element: <AdminListContract /> },
    { path: "/admin/list-address", element: <AdminListAddress /> },
    { path: "/admin/list-apartments", element: <AdminListApartment />},
    { path: "/admin/show-user-apartments/:id", element: <SeederApartmentsPage/>}

    // Add more routes specific to the admin role
  ];
  
//   // Renter Routes
//   const renterRoutes = [
//     { path: "/renter/dashboard", element: <RenterDashboard /> },
//     { path: "/renter/search", element: <RenterSearch /> },
//     { path: "/renter/bookings", element: <RenterBookings /> },
//     // Add more routes specific to the renter role
//   ];
  
  // Common Routes (for all users)
  const commonRoutes = [
    { path: "/", element: <Home /> },
    { path: "/introduce", element: <Introduce /> },
    { path: "/list-apartment", element: <ShowAllApartments /> },
    { path: "/co-living", element: <CoLiving /> },
    { path: "/services", element: <Service /> },
    { path: "/detail-apartment/:id", element: <Detail /> },
    { path: "/sign-in", element: <SignIn /> },
    { path: "/user-profile", element: <UserProfile /> },
    { path: "/sign-up", element: <SignUp /> },
    { path: "/reset-password", element: <ResetPasswordForm /> },
    { path: "/confirm-password-reset", element: <ConfirmPasswordResetPage /> },
  ];
  
  // Combine all routes
  export const routes = {
    // lessorRoutes,
    adminRoutes,
    // renterRoutes,
    commonRoutes,
  }
