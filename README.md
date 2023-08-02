# EVENT-MANAGEMENT-PLATFORM-MERN

# Provided 

#-Frontend And Backend Folders of React and nodejs

#-DataBase Data And Structure File

#-Screen Record Of the Event Management Platform

#-Testing of important .js files , in the frontend/src/testing folder



# How TO Run The MERN EVENT MANAGEMENT PLATFORM On Your PC 

#- Clone the repository in a folder 

#- Set up your database, and run the sql data and structure file provided (cloned)

#- Edit Connection.js from backend_nodejs folder, and enter your necessary password, and user [Currently my password and user is mentioned ]

#- Open terminal and run the following commands 

#- cd Backend_nodejs

#- npm install

#- npm run dev [Check if the server is running properly, which it should ]

#- Now you need to start to React server: - split the terminal - cd you way back to the root dir.[ cd .. ] 

#- cd frontend_reactjs 

#- npm install 

#- npm start 

#- TO run the test cases , stay in the frontend directory and run -> npm run test



# Requirements Met :
#-User Authentication: Implement a user authentication system. Users should be able to
register, log in, and log out.

#-Event Creation: Users should be able to create a new event with a title, description,
date, time, and location. Each user should be limited to creating no more than 3 events
per day.
[A counter is made, if 3 events are made, them the card would get blurred - and user wont be able to make any more events]

#-Event Update and Deletion: Users should be able to update and delete their own
events.

#-Event RSVP: Users should be able to RSVP to events created by other users. The
platform should track and display the number of RSVPs for each event. Each user can
RSVP to a maximum of 5 events per day.
[A counter is made, if 3 RSVPs are made, then the card would get blurred - and user wont be able to make any more RSVP]

#-Event Display: The platform should display all events in chronological order. Each event
should display the title, an excerpt of the description, date, time, location, and the
number of RSVPs.

#-User Interface: The platform should have a user-friendly interface where users can
easily navigate and perform actions.
