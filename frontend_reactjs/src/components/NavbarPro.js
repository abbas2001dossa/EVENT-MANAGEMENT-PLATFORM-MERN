import React from 'react'
import '../Styles/NavbarPro.css';
import av from './av.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavbarPro=(props)=> {
    
    const navigate = useNavigate();

    const myStyle ={
        marginLeft : '450px'  
    }

    const ma = {
        fontSize :'20px',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        fontWeight : 'bolder'
    }

    const left ={
        marginLeft:'30px'
    }

    function logout (){
        const Url = 'http://127.0.0.1:8000/logout';
        console.log("log out clicked ");
        var d  ="data";
        axios.post(Url ,d)
        .then(response => {
            if (response.data.message == "ServerError"){
                console.log(response.data.message);
            } 
            else if ( response.data.message == "LogoutFailed"){
                console.log(response.data.message);
            }
            else if (response.data.message =="logoutSuccess"){
                console.log(response.data.message);
                navigate('/spin');
            } 
        })
        .catch(error => {
            // Handle any errors that occurred during the request
            console.error('Error fetching data:', error);
        });
        
    }

    
  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-lg">
        <a className="navbar-brand ml-5 " style={ma} > <b> ATTENDIFY </b> </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse ml-5" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only"></span></a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Dropdown</a>
            </li>
            </ul>
            <form className="form-inline my-2 my-lg-0 d-flex flex-row ml-5" style={myStyle}>
                <div className="profile-picture" >
                    <img src={av} className="rounded-circle"/>
                </div>
                <div className="row shaded border border-1 rounded">
                    <h5 className='text-center mt-2'> Welcome, <span className='text-primary'><b> {props.username} </b>  </span></h5>
                </div>
                <div className="row shaded border border-1 rounded" style={left}>
                    <button className='btn btn-secondary text-center ' type="button" onClick={logout}> Log Out </button>
                </div>
            </form>
        </div>
        </nav>
    </>
  )
}

export default NavbarPro
