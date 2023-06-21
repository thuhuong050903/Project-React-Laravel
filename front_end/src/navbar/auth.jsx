import { Routes, Route, Link } from 'react-router-dom';
import Home from '../view/User/Home';
import Introduce from '../view/User/Introduce';
import Co_Living from '../view/User/Co_Living';
// import Dashboard from '../component/dashboard';
import AuthUser from '../component/AuthUser';
import '../assets/style/auth.css';
import { useEffect, useState } from 'react';
import List_Apartment from '../view/User/List_Apartment';
import Detail from '../view/User/Detail';
function Auth() {
    const { token, logout } = AuthUser();
    const logoutUser = () => {
        if (token != undefined) {
            logout();
        }
    }
    const { http } = AuthUser();
    const [userdetail, setUserdetail] = useState(null);

    useEffect(() => {
        fetchUserDetail();
    }, []);

    const fetchUserDetail = () => {
        http.post('/me').then((res) => {
            setUserdetail(res.data);
        });
    }
    return (
        <div>
            <div className="header">
                <nav className="navbar navbar-expand-sm ">
                    <ul className="navbar-nav list-item">
                        <li className="dreamhome">
                            <Link className="dreamhome-link" to="/">
                                DreamHome
                            </Link>
                        </li>
                        <li className="item-header">
                            <Link className="item-header-link" to="/Introduce">Giới thiệu</Link>
                        </li>
                        <li className="item-header">
                            <Link className="item-header-link" to="/Co_Living">Co_Living</Link>
                        </li>
                        <li className="item-header">
                            <Link className="item-header-link" to="/Co_Living">Đối tác</Link>
                        </li>
                        <li className="item-header">
                            <Link className="item-header-link" to="/Co_Living">Tin tức</Link>
                        </li>
                        <li className="item-header">
                            <Link className="item-header-link" to="/Co_Living">Dịch vụ</Link>
                        </li>
                        <li className="item-header">
                            <Link className="item-header-link" to="/ShowApartment">Loại phòng</Link>
                        </li>

                        {userdetail && (
                            <>
                                <li className="item-header">
                                    <span className="item-header-link greeting">
                                        Xin chào, {userdetail.username}
                                    </span>
                                </li>
                                <li className="item-header">
                                    <Link className="item-header-link settings-link" to="/dashboard">
                                        Cài đặt
                                    </Link>
                                </li>
                                <li className="item-header">
                                    <span
                                        role="button"
                                        className=" logout-button"
                                        onClick={logoutUser}
                                    >
                                        Logout
                                    </span>
                                </li>
                            </>
                        )}


                    </ul>
                </nav>

            </div>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Introduce" element={<Introduce />} />
                    <Route path="/Co_Living" element={<Co_Living />} />
                    <Route path="/ShowApartment" element={<List_Apartment />} />
                    <Route path="/apartment/:id" element={<Detail/>} />
                    <Route path='/formBook/:id'></Route>
                    {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                </Routes>
            </div>
        </div>
    );

}
export default Auth;
