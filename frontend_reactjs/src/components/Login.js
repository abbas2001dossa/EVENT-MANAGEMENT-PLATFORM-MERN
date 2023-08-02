import React,{ useState } from 'react'
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import '../Styles/Register.css';
import AlertMessage from './AlertMessage';
import axios from 'axios';
import { useNavigate ,Link} from 'react-router-dom';
import Navbar from './Navbar';

function Login() {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState(' Welcome to the Login Page ');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [userId, setUserId] = useState('');

  const [Data, setData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function handleLogin (){
        console.log("Login Clicked ! ");
        console.log(Data);
    
      axios.post('http://127.0.0.1:8000/login', Data, { withCredentials: true })
      .then((response) => {
        // Handle successful response
        console.log(response.data.message);
        if ( response.data.message  === "InvalidCredentials"){
            setAlertMessage(" Invalid Credentials !");
            setAlertSeverity("error");
        }
        else if (response.data.message  === "AuthenticationSuccessful"){
            setAlertMessage(" Login Successful");
            setAlertSeverity("success");
            setUserId(response.data.userId);
            console.log(userId);
            console.log(response.data.userName);

            if (response.data.designation  === "Admin"){
                navigate('/Admin');
            }else{
                navigate('/user');
            }

            

            
        }
        else if (response.data.message  === "UserNotApprovedYet"){
          setAlertMessage(" User has not been approved yet ");
          setAlertSeverity("error");
        }
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      }); 

  }

  return (
    <>
        <Navbar></Navbar>
        <AlertMessage message={alertMessage} severity={alertSeverity} ></AlertMessage>
        <MDBContainer fluid className="p-3 my-5 h-custom">
        <MDBRow>
            <h1 className='text-shadow'><b> LOGIN </b></h1>
        </MDBRow>
        <MDBRow>

            <MDBCol col='10' md='6'>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
            </MDBCol>

            <MDBCol col='4' md='6'>

            <MDBInput name="username" wrapperClass='mb-4'  value={Data.username} onChange={handleInputChange} label='Username'  type='email' size="lg"/>
            <MDBInput name="password" wrapperClass='mb-4'  value={Data.password} onChange={handleInputChange} label='Password'  type='password' size="lg"/>

            <div className="d-flex justify-content-between mb-4">
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                <a href="!#">Forgot password?</a>
            </div>

            <div className='text-center text-md-start mt-4 pt-2'>
                <button className="mb-0 bg-primary text-white px-5" onClick={handleLogin} size='lg'>Login</button>
                <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <Link to='/register' className="link-danger">Register</Link></p>
            </div>

            </MDBCol>

        </MDBRow>

        

        </MDBContainer>
    </>
  )
  }


export default Login
