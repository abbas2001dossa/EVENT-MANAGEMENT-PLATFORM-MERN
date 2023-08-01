import React, { useState, useEffect } from 'react';
import NavbarPro from '../NavbarPro';
import axios from 'axios';
import '../../Styles/CreateEvent.css';
import { useNavigate } from 'react-router-dom';

function ModifyEvent() {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState();
  const [events, setEvents] = useState([]);
  const [eventClicked, setEventClicked] = useState('');
  const [eventDetails, setEventDetails] = useState({});

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if(eventClicked){
        axios.post('http://127.0.0.1:8000/getEventDetails', { eventClicked: eventClicked })
        .then((response) => {
            console.log(response.data);
            
            console.log(response.data[0].title);
            setTitle(response.data[0].title);
            setDescription(response.data[0].description);
            setTime(response.data[0].time);
            setLocation(response.data[0].location);
            console.log(response.data[0].date);
            const formattedDate = new Date(response.data[0].date).toISOString().split('T')[0];
            setDate(formattedDate);
            
        })
        .catch((error) => {
            console.error(error);
        });
    }
  }, [eventClicked]);
  
  
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

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  function AddDescription() {
    document.getElementById('description').style.display = 'block';
    document.getElementById('body').style.filter = 'blur(5px)';
  }

  function Closebtn() {
    document.getElementById('description').style.display = 'none';
    document.getElementById('body').style.filter = 'none';
  }

  function setbtn() {
    document.getElementById('description').style.display = 'none';
    document.getElementById('body').style.filter = 'none';
  }

  function goback() {
    const currentUrl = window.location.pathname;
    const lastSlashIndex = currentUrl.lastIndexOf('/');
    const newUrl = currentUrl.substring(0, lastSlashIndex);
    navigate(newUrl);
  }

  function submit() {
    const eventData = {
      title: title,
      description: description,
      time: time,
      location: location,
      date: date,
      userId: userId,
      titleHit : eventClicked,
    };
    const currentUrl = window.location.pathname;
    const lastSlashIndex = currentUrl.lastIndexOf('/');
    const newUrl = currentUrl.substring(0, lastSlashIndex);

    axios
      .post('http://127.0.0.1:8000/modify-event', eventData)
      .then((response) => {
        // Handle successful response
        console.log(response.data);
        if (response.data.message === 'ServerError') {
          // Handle error message if needed
        } else if (response.data.message === 'Event created and user table updated successfully') {
          console.log('DATABASE UPDATED AND INSERTED!');
          navigate(newUrl);
        }
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  }

  const mystyle = {
    marginLeft: '20px',
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

  

  

  return (
    <>
      <div id="body">
        <NavbarPro username={username} />

        <div className="container">
          <div className="form">
            <h1 className="mt-2">
              <b style={mystyle}>Modify An Event</b>
              <select
                id="chooseEvent"
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
            </h1>
            <div className="inputs">
              <div className="title">
                <h6>
                  <b>Modify Event Title:</b>
                </h6>
                <div className="d-flex-flex-col">
                  <input
                    id="title"
                    className="text-black"
                    type="text"
                    placeholder="Enter Event Name"
                    value={title}
                    onChange={handleChange}
                  />
                  <button type="button" onClick={AddDescription}>
                    Modify Description
                  </button>
                </div>
              </div>

              <div className="row">
                <div className="date mt-5 col-sm-4">
                  <h6>
                    <b>Modify Event Date:</b>
                  </h6>
                  <input type="date" value={date} onChange={handleDateChange} />
                </div>
                <div className="date mt-5 col-sm-4">
                  <h6>
                    <b>Modify Event Time:</b>
                  </h6>
                  <input type="time" value={time} onChange={handleTimeChange} />
                </div>
                <div className="date mt-5 col-sm-4">
                  <h6>
                    <b>Modify Event Location:</b>
                  </h6>
                  <select
                    value={location}
                    onChange={handleLocationChange}
                    name="status"
                    className="custom-select"
                  >
                    <option className="text-black">Choose Location</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Sukkur">Sukkur</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Multan">Multan</option>
                    <option value="Hyderabad">Hyderabad</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="end">
              <div className="row">
                <div className="col-sm-2">
                  <button className="btn btn-primary text-white text-center" onClick={goback} type="button">
                    Go Back
                  </button>
                </div>
                <div className="col-sm-8"></div>
                <div className="col-sm-2">
                  <button className="btn btn-primary text-white text-center" onClick={submit} type="button">
                    Modify
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="description" id="description">
        <h3 className="text-center mt-4">
          <b>Modify Event Description</b>
        </h3>
        <hr />
        <textarea className="text-black" value={description} onChange={handleDescription} cols="50" rows="5"></textarea>
        <hr />
        <div className="">
          <button type="button" id="set" onClick={setbtn} className="btn btn-primary text-black">
            SET
          </button>
          <button type="button" onClick={Closebtn} id="close" className="btn btn-danger text-black">
            CLOSE
          </button>
        </div>
      </div>
    </>
  );
}

export default ModifyEvent;
