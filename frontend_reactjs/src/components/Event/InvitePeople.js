import React,{useState,useEffect} from 'react'
import axios from 'axios'
import NavbarPro from '../NavbarPro'
import AlertMessage from '../AlertMessage'
import '../../Styles/CreateEvent.css';
import { useNavigate } from 'react-router-dom';


function InvitePeople() {
    const [Username,setUsername]=useState('');
    const [userId , setUserId]=useState('');
    const [message, setMessage]=useState(' Choose Your Event And Then Invite People : ');
    const [severity,setSeverity]= useState('success');
    const [eventClicked, setEventClicked] = useState('');
    const [events, setEvents] = useState([]);
    const [eventId , setEventId]=useState();
    const navigate = useNavigate();
    const [Usernames,setUsernames]=useState([]);
    const [invitedUsernames , setInvitedUsernames]=useState([]);
    const [invitationMessage,setInvitationMessage]= useState('');

    useEffect(() => {
        axios
          .get('http://127.0.0.1:8000/getUserData', { withCredentials: true })
          .then((response) => {
            console.log('Data:', response.data);
            setUsername(response.data[0].username);
            setUserId(response.data[0].id);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, []);
      


      useEffect(() => {
        if(eventClicked){
            axios.post('http://127.0.0.1:8000/getEventDetails', { eventClicked: eventClicked })
            .then((response) => {
                console.log(response.data[0]);      
                setEventId(response.data[0].id);
                console.log( "Event id " +eventId);
            })
            .catch((error) => {
                console.error(error);
            });
        }
      }, [eventClicked]);

      useEffect(() => {
        if(eventClicked){
            axios.post('http://127.0.0.1:8000/getUserNames', { Username : Username})
            .then((response) => {
                console.log(response.data);      
                setUsernames(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        }
      }, [eventClicked]);


      const handleCheckboxToggle = (username) => {
        const usernameIndex = invitedUsernames.indexOf(username);
        if (usernameIndex === -1) {
          setInvitedUsernames([...invitedUsernames, username]);
        } else {
          const updatedUsernames = [...invitedUsernames];
          updatedUsernames.splice(usernameIndex, 1);
          setInvitedUsernames(updatedUsernames);
        }
      };


      function selectEvents() {
        axios
          .post('http://127.0.0.1:8000/getUserEvents', { userId: userId })
          .then((response) => {
            // Handle successful response
            console.log(response.data);
            setEvents(response.data);
          })
          .catch((error) => {
            // Handle error
            console.error(error);
          });
      }

      const handleChangeSelect = (event) => {
    
        setEventClicked(event.target.value);
        console.log(eventClicked);
      };

      const handleinvitationMessage =(event)=>{
        setInvitationMessage(event.target.value);
      }

      function sendInvite(){
        console.log(invitedUsernames);

        
          axios.post('http://127.0.0.1:8000/invite-people', {  eventId : eventId , eventTitle : eventClicked , username : Username ,  invitedUsernames : invitedUsernames , status : "pending" , message : invitationMessage })
          .then((response) => {
            // Handle successful response
            console.log(response.data);
            if (response.data.message === 'INSERTED'){
              const currentUrl = window.location.pathname;
              const lastSlashIndex = currentUrl.lastIndexOf('/');
              const newUrl = currentUrl.substring(0, lastSlashIndex);
              navigate(newUrl);
            }
            
          })
          .catch((error) => {
            // Handle error
            console.error(error);
          });

      }

      function goBack () {
        const currentUrl = window.location.pathname;
        const lastSlashIndex = currentUrl.lastIndexOf('/');
        const newUrl = currentUrl.substring(0, lastSlashIndex);
        navigate(newUrl);
      }

      

    return (
    <>
        <NavbarPro username={Username}></NavbarPro>
        <AlertMessage message={message} severity={severity}></AlertMessage>

        <div className="container">
          <div className="form">
            <h1 className='text-center text-shadow'><b> Send Invites </b></h1>
            <select
                id="chooseEventInInvitePeople"
                onClick={selectEvents}
                value={eventClicked}
                onChange={handleChangeSelect}
              >
                <option className="text-black">Choose Event</option>
                {events.map((event) => (
                  <option key={event.id} value={event.title} >
                    {event.title}
                  </option>
                ))}
            </select>
          
          <div className="invitation">
            <div >
                <div className="scroll1 bg-white">
                  {Usernames.map((user, index) => (
                    <div id="usernamez" key={index} className="row  align-items-center">
                      <div className="col">
                        <input onChange={() => handleCheckboxToggle(user.username)} checked={invitedUsernames.includes(user.username)} type="checkbox" id={`user_${index}`} className="mr-2" />
                      </div>
                      <div className="col">
                        <label  className="mb-0">{user.username}</label>
                      </div>
                    </div>
                    
                  ))}
                </div>
                <div className="message ">
                    <textarea value={invitationMessage} onChange={handleinvitationMessage} className='text-black' placeholder='Enter Invitation Message Here ...' id="textAreaMsg" cols="50" rows="4"></textarea>
                </div>
            </div>
            <div className="row">
                <button id="sendInvite" onClick={sendInvite} type='button' className='btn btn-primary'> Send Invite </button>
                <button id="goBack"  onClick={goBack} type='button' className="btn btn-primary"> Go Back </button>
            </div>
            </div>
          </div>
        </div> 
         

    </>
  )
}

export default InvitePeople