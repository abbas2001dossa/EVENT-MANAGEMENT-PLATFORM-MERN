import React,{useState,useEffect} from 'react'
import NavbarPro from '../NavbarPro';
import AlertMessage from '../AlertMessage';
import axios from 'axios';
import '../../Styles/CheckInvitation.css';
import download from './download.png';
import { useNavigate } from 'react-router-dom';


function CheckInvitation() {

    const [Username,setUsername]=useState('');
    const [AlertMessageee,setAlertMessageee]=useState(' Check Your Invites ');
    const [AlertSeverity ,setAlertSeverity]=useState('success');
    const [invitations , setInvitations]=useState([]);
    const [NumOfInvite, setNumOfInvite]=useState();
    const navigate = useNavigate();

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


    useEffect(() => {
      
        axios.post('http://127.0.0.1:8000/getInvitations' , { Username : Username})
        .then((response) => {
          console.log(' Invitations:', response.data);
          setInvitations(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });

    }, [Username])
    
    function DateFormat(dateString) {
        const dateObj = new Date(dateString);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
      
        return `${year}-${month}-${day}`;
    }

    function FindInvitaton (title){
        axios.post('http://127.0.0.1:8000/getInvites' , { title : title})
        .then((response) => {
          console.log(' Invites:', response.data);
          setNumOfInvite(response.data[0].invites);
        
           
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
        return NumOfInvite;
    }

    function AcceptInvite( eventTitle , invitationId){
        axios.post('http://127.0.0.1:8000/accept-invite' , {eventTitle: eventTitle ,  invitationId : invitationId ,username :Username})
        .then((response) => {
            console.log(response.data.message);
            const currentUrl = window.location.pathname;
            const lastSlashIndex = currentUrl.lastIndexOf('/');
            const newUrl = currentUrl.substring(0, lastSlashIndex);        
            navigate(newUrl);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }

    function Declineinvite( invitationId ){
        axios.post('http://127.0.0.1:8000/delete-invite' , { invitationId : invitationId})
        .then((response) => {
            console.log(response.data.message);
            const currentUrl = window.location.pathname;
            const lastSlashIndex = currentUrl.lastIndexOf('/');
            const newUrl = currentUrl.substring(0, lastSlashIndex);        
            navigate(newUrl);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }

  return (

    <>
        <NavbarPro username={Username}></NavbarPro>
        <div className="container ">
           
                <div className="row">
                    {/* loop */}
                    {invitations.map((item) => (
                    <div key={item.id} className="card23 mt-5 shadow col-md-4">
                        
                        <div className="upper">
                            <img src="https://i.imgur.com/Qtrsrk5.jpg" className="img-fluid" alt="Upper Img" />
                        </div>

                        <div className="user text-center">
                            <div className="profile">
                            <img src="data:image/png;base64,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" className="rounded-circle" width="80" alt="Profile Img" />
                            </div>
                        </div>

                        <div className="mt-5 text-center">
                            <div id="speechBubble">
                                <img src={download} alt=""  /> 
                                <p className="text  text-shadow"> {item.invitationMessage}</p>
                            </div>
                            <div id='location'  className='btn btn-secondary text-shadow '> {item.eventLocation}   --<span className='ml-4 text-shadow'> {DateFormat(item.eventDate)}</span></div>
                            <h4 className="mb-0"> {item.username}</h4>
                            <hr />
                            <p className="text-muted d-block mb-2 fw-bolder"> {item.eventTitle} </p>
                            <p className="text-black mt-1"><span className='text-shadow fw-bold'> DESCRIPTION :  </span>
                                {item.eventDescription}
                            </p>
                            <hr />
                            <div className="d-flex justify-content-between border-black shadow align-items-center mt-4 px-4">
                            <div className="stats">
                                <h6 className="mb-0  text-shadow">Invitations</h6>
                                <span>{FindInvitaton(item.eventTitle) }</span>
                            </div>

                            <div className="stats">
                                <h6 className="mb-0 text-shadow"> Respondents </h6>
                                <span>{item.eventNumOfRsvp}</span>
                            </div>

                            <div className="stats">
                                <h6 className="mb-0 text-shadow"> Time </h6>
                                <span> {item.eventTime} </span>
                            </div>
                            </div>
                            <hr />
                            <div className="end mt-0 d-flex">
                                <button type='button' onClick={() => AcceptInvite(item.eventTitle , item.invitationId)} className='btn btn-success' id="Accept"> Accept</button>
                                <button type='button' onClick={() => Declineinvite(item.invitationId)} className='btn btn-danger' id="Decline"> Decline</button>
                            </div>
                        </div>
                        
                    </div>
                    ))}
                    
                    
                        
                    </div>
                    
                    
                
            
        </div>
    </>
  )
}



export default CheckInvitation