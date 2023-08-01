import React,{ useState } from 'react'
import {MDBContainer  ,MDBCardImage, MDBCol,MDBCard,MDBCardBody, MDBRow, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import '../Styles/Register.css';
import axios from 'axios';
import AlertMessage from './AlertMessage';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'


function Register() {
  const navigate = useNavigate();

  const [alertMessage, setAlertMessage] = useState(' Welcome to the Register Page ');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    repassword: ''
    
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  function  RegisterClick (){
    console.log("Register Clicked ! ");
    console.log(formData);
    if ( formData.password  === formData.repassword ){
      <AlertMessage message={"Registration Successful !"} severity={"success"}></AlertMessage>
      axios.post('http://127.0.0.1:8000/register', formData)
      .then((response) => {
        // Handle successful response
        console.log(response.data);

        navigate("/");

      })
      .catch((error) => {
        // Handle error
        console.error(error);
      }); 
    
    }
    else{
        setAlertMessage("Incorrect Passwords !");
        setAlertSeverity("error");
    }


  }

  return (
    <>
        <Navbar></Navbar>
        <AlertMessage message={alertMessage} severity={alertSeverity} ></AlertMessage>
        <MDBContainer fluid>

      <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
        <MDBCardBody>
          
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <h1 className="text-center text-shadow h1 fw-bold mb-5 mx-1 mx-md-4 mt-4"> Register </h1>
              

              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput value={formData.username} name="username" onChange={handleInputChange} label='Your username' id='form1' type='text' className='w-100'/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg'/>
                <MDBInput value={formData.password} name="password" onChange={handleInputChange} label='Password' id='form3' type='password'/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="key me-3" size='lg'/>
                <MDBInput label='Repeat your password' name="repassword" value={formData.repassword} onChange={handleInputChange} id='form4' type='password'/>
              </div>

              

              <button className='mb-4 btn btn-primary btn-lg' size='lg' onClick={ RegisterClick} style={{ transform: 'scale(1)' }}>Register</button>

            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
            </MDBCol>

          </MDBRow>
          
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>

    </>
  )
}

export default Register
