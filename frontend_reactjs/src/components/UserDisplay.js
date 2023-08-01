import React, { useEffect, useState } from 'react';
import '../Styles/Card.css';
import Card from './Card';
import NavbarPro from './NavbarPro';
import axios from 'axios';
import AlertMessage from './AlertMessage';


function  UserDisplay(){

  const [username,setUsername] = useState('');
  const [numberOfEvent,setNumberOfEvent]=useState();
  const currentDate = new Date();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];
  const [message,setMessage]= useState(' Welcome To The User Panel');
  const [severity,useSeverity]=useState('success');

  useEffect(() => {        
    axios.get('http://127.0.0.1:8000/getUserData' , { withCredentials: true })
    .then((response) => {
      console.log('Data:', response.data);
      setUsername(response.data[0].username);
      setNumberOfEvent(response.data[0].numOfEventsCreated);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });

    

}, []);








  // Extract the day and month from the current date
  const currentDay = currentDate.getDate();
  const currentMonth = monthNames[currentDate.getMonth()];

  return (
    <>
      <NavbarPro username={username}></NavbarPro>
      <AlertMessage message={message} severity={severity}></AlertMessage>
      <div className="container">
        <div className="row">
          <Card eventmanage={"create-event"} event={numberOfEvent} display={''} color={"success"} day={currentDay} month={currentMonth}  title={" Create an Event "} description={" Choose a suitable date and time for the event."}  ></Card>
          <Card eventmanage={"modify-event"} display={'none'} color={"info"} day={currentDay} month={currentMonth}  title={" Modify an Event "} description={" Update suitable date,time and location for an event, which is already made."}  ></Card>
          <Card eventmanage={"view-event"} display={'none'} color={"secondary"} day={currentDay} month={currentMonth}  title={" View Your Events "} description={" View the events you created, in addition delete any which doesnt suit you."}  ></Card>
          <Card eventmanage={"invite-people"} display={'none'} color={"danger"} day={currentDay} month={currentMonth}  title={"Invite People"} description={"Once your event is created, you can invite how many people you vwant..."}  ></Card>
          <Card eventmanage={"check-invitations"} display={'none'} color={"warning"} day={currentDay} month={currentMonth}  title={" Check Invitations "} description={" Check if someone has invited you for an event, and thus respond to it"}  ></Card>
        </div>
      </div>   
    </>
  )
}

export default UserDisplay
