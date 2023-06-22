import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagram, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';

// import { faFacebookSquare, faInstagram, faTwitterSquare } from 'react-icons/fa';
// import {Select} from 'react-select';
import AuthUser from '../AuthUser';
import '../../assets/style/Sign_up.css';
export default function Sign_up() {
   
      
    const navigate = useNavigate();
    const { http, setToken } = AuthUser();
    const [username, setUsername] = useState();
    const [fullname, setFullname] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [birthday, setBirthday] = useState();
    const [role, setRole] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isLoading, setIsLoading] = useState();
    const submitForm = () => {
        // api call
        console.log();
        setIsLoading(true);
        // isLoading = true;
        http.post('/register',
            {
                username: username, fullname: fullname, email: email, phone: phone,
                address: address, password: password, birthday: birthday, role: role
            }).then((res) => {
                alert("You registered successfully!")
                navigate('/Sign_in')
            })
    }
    return (
        <div className="container">
            <div className="row signup-form">
                <div className="col-lg-6">
                    <div className="social-icons">
                    <FontAwesomeIcon className="icon" icon={faFacebookSquare} />
                    <FontAwesomeIcon className="icon" icon={faInstagram} />
                    <FontAwesomeIcon className="icon" icon={faTwitterSquare} />
                    </div>
                    <h1 className="welcome">Welcome Back!</h1>
                    <h3 className="title">To keep connected with us please login with your personal info
                    </h3>
                    <button type="button" onClick={submitForm} className="signup-mt-6">Đăng nhập</button>
                </div>
                <div className="col-sm-6 sign-up-card">
                    <div className=" p-4">
                        <h1 className="text-center mb-3">Create Account</h1>
                        <form>
                            <div className="form-group">
                                <label className="title-title" htmlFor="username">Name:</label>
                                <input type="text" className="form-control" placeholder="Enter name"
                                    onChange={e => setUsername(e.target.value)}
                                    id="username" />
                            </div>
                            <div className="form-group mt-3">
                                <label className="title-title" htmlFor="fullname">Full name:</label>
                                <input type="text" className="form-control" placeholder="Enter full name"
                                    onChange={e => setFullname(e.target.value)}
                                    id="fullname" />
                            </div>
                            <div className="form-group mt-3">
                                <label className="title-title" htmlFor="email">Email address:</label>
                                <input type="email" className="form-control" placeholder="Enter email"
                                    onChange={e => setEmail(e.target.value)}
                                    id="email" />
                            </div>
                            <div className="form-group mt-3">
                                <label className="title-title" htmlFor="phone">Your phone:</label>
                                <input type="number" className="form-control" placeholder="Enter your phone"
                                    onChange={e => setPhone(e.target.value)}
                                    id="phone" />
                            </div>
                            <div className="form-group mt-3">
                                <label className="title-title" htmlFor="address">Your address:</label>
                                <input type="text" className="form-control" placeholder="Enter your address"
                                    onChange={e => setAddress(e.target.value)}
                                    id="address" />
                            </div>
                            <div className="form-group mt-3">
                                <label className="title-title" htmlFor="pwd">Password:</label>
                                <input type="password" className="form-control" placeholder="Enter password"
                                    onChange={e => setPassword(e.target.value)}
                                    id="pwd" />
                            </div>
                            <div className="form-group mt-3">
                                <label className="title-title" htmlFor="birthday">Your birthday:</label>
                                <input type="date" className="form-control" placeholder="Enter password"
                                    onChange={e => setBirthday(e.target.value)}
                                    id="birthday" />
                            </div>
                            <div className="form-group mt-3">
                                <label className="title-title" htmlFor="role">Your role:</label>
                                <select className="form-control" value={role} onChange={e => setRole(e.target.value)} id="role">
                                    <option value={'Nguoi cho thue'}>Nguoi cho thue</option>
                                    <option value={'Nguoi thue'}>Nguoi thue</option>
                                </select>
                            </div>
                            <button type="button" onClick={submitForm} className="mt-4">Register</button>
                            {isLoading && <div> Loading</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}
