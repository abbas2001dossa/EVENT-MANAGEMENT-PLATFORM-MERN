import React,{useState,useEffect} from 'react'
import NavbarPro from '../NavbarPro'
import AlertMessage from '../AlertMessage'
import axios from 'axios';
import Event from './Event';

function ViewEvent() {
  

    const [Username,setUsername]=useState('');
    const [userId , setUserId]=useState('');
    const [message, setMessage]=useState('Events You Created Are As Follows : ');
    const [severity,setSeverity]= useState('success');

    const [events, setEvents] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [time, setTime] = useState('');

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
        
        axios.post('http://127.0.0.1:8000/getUserEvents', { userId: userId })
        .then((response) => {
          // Handle successful response
          console.log(response.data);
          setEvents(response.data);
          console.log(events);
        })
        .catch((error) => {
          // Handle error
          console.error(error);
        });
    }, [userId]);

    const handleChildData = (data) => {
        setMessage(data);
        setSeverity("success");
      };

    const truncateDescription = (description) => {
        const words = description.split(' ');
        if (words.length <= 20) {
          return description;
        }
        return words.slice(0, 5).join(' ') + '...';
    };
      
      
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
      
      
    return (
    <>
        <NavbarPro username={Username}></NavbarPro>
        <AlertMessage message={message} severity={severity}></AlertMessage>
        <div className="row">
            {events.map((event) => (
                
                <Event respondent={event.numOfRsvp} sendDataToParent={handleChildData}  key={event.id} userId={event.userId} title={event.title} description={truncateDescription(event.description)} location={event.location} time={event.time} date={formatDate(event.date)}></Event>
            ))}

        </div>

    </>
  )
}

export default ViewEvent