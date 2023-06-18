import { useState } from "react"
import { useNavigate } from 'react-router-dom';
// import {Select} from 'react-select';
import AuthUser from '../AuthUser';
import '../../assets/style/Sign_up.css';
export default function Sign_up() {
    const navigate = useNavigate();
    const {http,setToken} = AuthUser();
    const [username,setUsername] = useState();
    const [fullname,setFullname] = useState();
    const [phone,setPhone] = useState();
    const [address,setAddress] = useState();
    const [birthday,setBirthday] = useState();
    const [role,setRole] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [isLoading,setIsLoading] = useState();
    const submitForm = () =>{
        // api call
        console.log();
        setIsLoading (true);
        // isLoading = true;
        http.post('/register',
        {username:username,fullname:fullname,email:email,phone:phone,
         address:address,password:password, birthday:birthday, role:role}).then((res)=>{
            alert("You registered successfully!")
            navigate('/Sign_in')
        })
    }
    return(
        <div className="row justify-content-left pt-5">
            <div className="col-sm-6">
                <div className="card p-4">
                    <h1 className="text-center mb-3">Register </h1>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="test" className="form-control" placeholder="Enter name"
                            onChange={e=>setUsername(e.target.value)}
                        id="username" />
                    </div>
                    <div className="form-group">
                        <label>Full name:</label>
                        <input type="test" className="form-control" placeholder="Enter full name"
                            onChange={e=>setFullname(e.target.value)}
                        id="fullname" />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address:</label>
                        <input type="email" className="form-control" placeholder="Enter email"
                            onChange={e=>setEmail(e.target.value)}
                        id="email" />
                    </div>
                    <div className="form-group">
                        <label>Your phone:</label>
                        <input type="number" className="form-control" placeholder="Enter your phone"
                            onChange={e=>setPhone(e.target.value)}
                        id="phone" />
                    </div>
                    <div className="form-group">
                        <label>Your address:</label>
                        <input type="text" className="form-control" placeholder="Enter your address"
                            onChange={e=>setAddress(e.target.value)}
                        id="address" />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password:</label>
                        <input type="password" className="form-control" placeholder="Enter password"
                            onChange={e => setPassword(e.target.value)}
                        id="pwd" />
                    </div>
                    <div className="form-group mt-3">
                        <label>Your birthday:</label>
                        <input type="date" className="form-control" placeholder="Enter password"
                            onChange={e => setBirthday(e.target.value)}
                        id="birthday" />
                    </div>
                    <div className="form-group mt-3">
                        <label>Your role:</label>
                        {/* <input type="text" className="form-control" placeholder="Enter your role"
                            onChange={e=>setRole(e.target.value)}
                        id="role" /> */}
                        <select
                        className="form-control" value={role} onChange={e => setRole(e.target.value)}>
                            <option value={'Nguoi cho thue'}>Nguoi cho thue</option>                            
                            <option value={'Nguoi thue'}>Nguoi thue</option>

                        </select>
                    </div>
                    <button type="button"  onClick={submitForm} className="btn btn-primary mt-4">Register</button>
                    {isLoading && <div> Loading</div>}
                </div>
            </div>
        </div>
    )
}