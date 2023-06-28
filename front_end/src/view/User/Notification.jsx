import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function Notification()  {
    const { id } = useParams();
    const { http } = AuthUser();
    const [userLoaded, setUserLoaded] = useState(false);  
    const [userdetail, setUserdetail] = useState(null);

    useEffect(() => {
        fetchUserDetail();
    }, []);

    const fetchUserDetail = () => {
        http.post('http://127.0.0.1:8000/api/me').then((res) => {
            setUserdetail(res.data);
              setUserLoaded(true);
        });
    }

    useEffect(() => {
        fetch('http://localhost:8000/api/get-apartment')
          .then(response => response.json())
          .then(data => {
            const status = data;
        })
        .catch(error => console.log(error));
    }, []);
}

export default Notification;