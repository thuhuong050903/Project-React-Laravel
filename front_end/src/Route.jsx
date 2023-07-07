import Home from './view/User/Home';
import Service from './view/User/Service';
import Introduce from './view/User/Introduce';
import CoLiving from './view/User/CoLiving';
import SignIn from './component/Account/SignIn';
import SignUp from './component/Account/SignUp';
import AdminListApartment from './view/Admin/AdminListApartment';
import AdminDashboard from './view/Admin/AdminDashboard';
import AdminListUser from './view/Admin/AdminListUser';
import Detail from './view/User/Detail';
import ResetPasswordForm from './component/Account/ResetPasswordPage';
import ConfirmPasswordResetPage from './component/Account/ConfirmPasswordResetPage';
import AdminListSeeder from './view/Admin/AdminListSeeder';
import AdminListContract from './view/Admin/AdminListContract';
import AdminListAppointment from './view/Admin/AdminListAppointment';
import AdminListService from './view/Admin/AdminListService';
import SeederApartmentsPage from './view/Admin/SeederApartmentsPage';
import ShowAllApartments from './view/User/ShowAllApartments';
import UserProfile from './view/User/UserProfile';
import Contract from './view/Management/Shows/Contract'
import ConfirmAppointment from './view/Management/Shows/ConfirmAppointment';
import DashboardManagement from './view/Management/DashboardManagement';
import LessorShowApartment from './view/Management/Shows/LessorShowApartment';
import EditApartment from './view/Management/Shows/EditApartment';
import History from './view/User/History';
import ApartmentIssue from './view/Management/Shows/ApartmentIssue';
import BookApartment from './view/Management/Shows/BookApartment';
import ShowShortTermApartments from './view/User/ShowShortTermApartment';
import ShowLongTermApartment from './view/User/ShowLongTermApartment';
  // Admin Routes
  const adminRoutes = [
    { path: "/admin/dashboard", element: <AdminDashboard /> },
    { path: "/admin/list-users", element: <AdminListUser /> },
    { path: "/admin/list-seeders", element: <AdminListSeeder /> },
    { path: "/admin/list-contracts", element: <AdminListContract /> },
    { path: "/admin/list-apartments", element: <AdminListApartment />},
    { path: "/admin/list-services", element: <AdminListService />},
    { path: "/admin/show-user-apartments/:id", element: <SeederApartmentsPage/>},
    { path: "/admin/list-appointments", element: <AdminListAppointment />},
  ];
  
//user routes
  const commonRoutes = [  
    { path: "/lessor/book_apartment", element: < BookApartment /> },
    { path: "/lessor/apartment_issue", element: < ApartmentIssue/> },
    {path: "/lessor/dashboard", element: <DashboardManagement /> },
  { path: "/lessor/get-apartments-byLessorId/:id", element: <LessorShowApartment /> },
  { path: "/lessor/contracts", element: < Contract/> },
  { path: "/lessor/appointments", element: < ConfirmAppointment/> },
  { path: "/lessor/edit-apartment/:id", element: < EditApartment/> },

    { path: "/", element: <Home /> },
    { path: "/introduce", element: <Introduce /> },
    { path: "/history", element: <History /> },
    { path: "/list-apartment", element: <ShowAllApartments /> },
    { path: "/co-living", element: <CoLiving /> },
    { path: "/services", element: <Service /> },
    { path: "/detail-apartment/:id", element: <Detail /> },
    { path: "/sign-in", element: <SignIn /> },
    { path: "/user-profile", element: <UserProfile /> },
    { path: "/sign-up", element: <SignUp /> },
    { path: "/reset-password", element: <ResetPasswordForm /> },
    { path: "/short-term-apartments", element: <ShowShortTermApartments /> },
    { path: "/long-term-apartments", element: <ShowLongTermApartment/> },
    { path: "/confirm-password-reset", element: <ConfirmPasswordResetPage /> },
  ];
  
  export const routes = {
    adminRoutes,
    commonRoutes,
  }
