import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AlertMessage from './AlertMessage';


function UserAuthorization() {

  const [data, setData] = useState([]);
  const [alertMessage, setAlertMessage] = useState(' Welcome to the Admin Page ');
  const [alertSeverity, setAlertSeverity] = useState('success');
  
  useEffect(() => {
    const apiUrl = 'http://127.0.0.1:8000/authorize'; // Replace with your actual API URL
    
    

    axios.get(apiUrl)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
          // Handle any errors that occurred during the request
        console.error('Error fetching data:', error);
      });


    }, []);

    let count =0 ; 

    

    const accept =(id )=>{
      
      
      const Url = 'http://127.0.0.1:8000/authorize/accept';
      console.log("Accept clicked ");
      console.log(id);
      // sath id send kro 
      axios.post(Url , {id} )
      .then(response => {
        if (response.data.message == "ServerError"){
          setAlertMessage(" Server Error ");
          setAlertSeverity("error");
        }
        else if (response.data.message == "UpdateNotPossible"){
          setAlertMessage(" Authorization Not Possible ");
          setAlertSeverity("error");
        }
        else if (response.data.message == "UserAuthorized"){
          setAlertMessage("User Id " + response.data.id + " is Authorized ! ");
          setAlertSeverity("success");
        }
      })
      .catch(error => {
          // Handle any errors that occurred during the request
        console.error('Error fetching data:', error);
      });

    }

    const decline =(id)=>{
      console.log("Decline clicked for ID:", id);
      const Url = 'http://127.0.0.1:8000/authorize/decline';
      
      axios.post(Url , {id} )
      .then(response => {
        if (response.data.message == "ServerError"){
          setAlertMessage(" Server Error ");
          setAlertSeverity("error");
        }
        else if (response.data.message == "UserDeleted"){
          setAlertMessage("User Id " + response.data.id + " is successfully deleted ! ");
          setAlertSeverity("success");
        }
      })
      .catch(error => {
          // Handle any errors that occurred during the request
        console.error('Error fetching data:', error);
      });
    }


  return (
    <>
      <AlertMessage message={alertMessage} severity={alertSeverity} ></AlertMessage>
      <table className="table mt-3 text-center">

        <thead>
            <tr>
            <th scope="col">No# </th>
            <th scope="col"> Username </th>
            <th scope="col">status</th>
            <th scope="col" className='ml-5'> Approve / Disapprove </th>
            <th></th>
            </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id} id={item.id} >
            <th scope="row"> {++count}</th>
            <td> {item.username}</td>
            <td>{item.status}</td>
            <td><button id={item.id} type="button" onClick={() => decline(item.id)} className="btn btn-danger">Decline </button></td>
            <td><button id={item.id} type="button" onClick={() => accept(item.id)} className="btn btn-success">Accept</button></td>
            </tr>
          ))}  
            
        </tbody>
       </table>
    </>
  )
}

export default UserAuthorization
