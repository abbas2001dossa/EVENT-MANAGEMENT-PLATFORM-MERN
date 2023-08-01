import React, {useEffect, useState } from 'react'
import '../../Styles/Event.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Event =(props)=> {

    const navigate = useNavigate();
    const [disp,setDisp]=useState('');

    const mystyle ={
        width:'18rem',
        margin: '50px',
        borderRadius :'10px',
        border: '1px solid grey',
        display: disp,
        height:'400px'
    }

    function Modify(){
        navigate('/user/modify-event');
    }

    function Delete (){
        axios.post('http://127.0.0.1:8000/delete-event', { userId: props.userId , title: props.title })
        .then((response) => {
          // Handle successful response
          console.log(response.data);
          if (response.data.message === 'Event Successfully Deleted'){
            props.sendDataToParent("Event Successfully Deleted");
            window.location.reload();
          }
        })
        .catch((error) => {
          // Handle error
          console.error(error);
        });


        
    }

  return (
    <>
        <div className="card" style={mystyle}>
            <div className="card-body">
                <button className="badge badge-pill badge-warning">{props.date}</button>
                <hr />
                <h5 className="card-title mt-4"> {props.title} </h5>
                <hr />
                <div className="shadow">
                    <div className="row border bg-white">
                        <h6 className='shadowl text-bold'>Description : </h6>
                        <p className='text-black'> {props.description} </p>
                    </div>
                    <div className="row border mt-2 bg-white">
                        <h6 className="shadowl"> Location : </h6>
                        <p className="text-black"> {props.location} </p>
                    </div>
                    <div className="row border mt-2 bg-white">
                        <h6 className="shadowl"> Time : </h6>
                        <p className="text-black"> {props.time}</p>
                    </div>
                </div>
                <div className='bottom'>
                    <button id="modify" onClick={Modify} className="btn btn-primary"> Modify </button>
                    <button id="delete" onClick={Delete} className='btn btn-danger'> X </button>
                    <button id="respondent"  className='btn btn-success'> Respondents : {props.respondent} </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Event