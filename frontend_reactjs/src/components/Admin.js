import React from 'react'
import NavbarPro from './NavbarPro'
import { useState,useEffect } from 'react';
import UserAuthorization from './UserAuthorization';
import axios from 'axios';

const Admin=(props)=> {
    
    const [username,setUsername] = useState('');

    useEffect(() => {
      
        
        axios.get('http://127.0.0.1:8000/getUserData' , { withCredentials: true })
        .then((response) => {
          console.log('Data:', response.data);
          setUsername(response.data[0].username);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });

    }, []);
    


    return (
    <>
        <NavbarPro username={username} > </NavbarPro> 
        <UserAuthorization></UserAuthorization>
    </>
  )
}

export default Admin
