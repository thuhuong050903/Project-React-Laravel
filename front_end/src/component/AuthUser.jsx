import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthUser(){
    const navigate = useNavigate();

    const getToken = () =>{
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }

    const getUser = () =>{
        const userString = sessionStorage.getItem('user');
        const user_detail = JSON.parse(userString);
        return user_detail;
    }



    const [token,setToken] = useState(getToken());
    const [user,setUser] = useState(getUser());

    const saveToken = (user,token) =>{
        sessionStorage.setItem('token',JSON.stringify(token));
        sessionStorage.setItem('user',JSON.stringify(user));

        setToken(token);
        setUser(user);
        navigate('/');
    }

    const logout = () => {
        sessionStorage.clear();
        navigate('/login');
    }

    const http = axios.create({
        baseURL:"http://localhost:8000/api",
        headers:{
            "Content-type" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    });
    if (token) {
        http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    // Trong component AuthUser
// const checkEmailExists = async (email) => {
//     try {
//       const response = await http.get(`/check-email-exists/${email}`);
//       return response.data.exists; // Trả về true nếu email đã tồn tại, ngược lại trả về false
//     } catch (error) {
//       console.error('Lỗi khi kiểm tra email:', error);
//       return false;
//     }
//   };
  
    return {
        setToken:saveToken,
        token,
        user,
        getToken,
        http,
        logout
    }
}