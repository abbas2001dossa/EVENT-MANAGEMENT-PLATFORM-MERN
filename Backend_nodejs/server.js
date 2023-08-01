const express = require('express');
const cors = require('cors');
const connection = require('./connection');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, // Enable credentials (e.g., cookies) for CORS
  };
  
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: 'some secret',
    saveUninitialized: true,
    resave: true,
  })
);

global.gloabalUserId;



//  post and get requests 

app.post('/register', (req, res) => {
  console.log("Registering users ... ");
  console.log(req.body.username);
  console.log(req.body.password);
  const username = req.body.username;
  const password = req.body.password;
  const status = "pending";
  const numOfEventsCreated=0;

  const query = 'insert into user (username, password, status,numOfEventsCreated) values (?,?,?,?)';
  connection.query(query, [username, password, status,numOfEventsCreated], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.json({ message: 'ServerError' });
    } else {
      res.json({ message: 'Inserted in database successfully' });
      console.log('Data inserted successfully:', result);
    }
  });
});

app.post('/getEventDetails' , (req,res)=>{
  const q2 ='select * from event where title= ?';
  connection.query(q2,[req.body.eventClicked],(err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.json({ message: 'ServerError' });
    } else {
      console.log(result);
      res.json(result);
    }
  });

});

app.post('/getUserNames',(req,res)=>{

  console.log(req.body.Username);
  const q = 'SELECT * FROM user WHERE username != ? and username != ? and status = ?';
  connection.query(q,[req.body.Username,'abbasdossa','accepted'],(err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.json({ message: 'ServerError' });
    } else {
      res.json(result);
    }
  });

});

app.post('/invite-people' , (req,res)=>{
  console.log(req.body);
  const { eventId, eventTitle, username, invitedUsernames, status, message } = req.body;

  let count =0;
  for ( let i=0 ; i< invitedUsernames.length ;i++)
  {
    let query = `INSERT INTO invitation (eventId, eventTitle, username, invitedUsername, status, message) VALUES (?,?,?,?,?,?)`
    connection.query(query,[eventId,eventTitle,username,invitedUsernames[i],status,message  ],(err, result) => {
      if (err) {
        console.error('Error querying database:', err);
        return res.json({ message: 'ServerError' });
      } else {
        ++count;
      }
    });
  }


  res.json({message:"INSERTED"});
  
  

});

app.post('/getUserEvents',(req,res)=>{
  console.log("User id is : " + req.body.userId);
  const q = 'SELECT * FROM event WHERE userId = ?';
  connection.query(q,[req.body.userId],(err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.json({ message: 'ServerError' });
    } else {
      res.json(result);
    }
  });

});

app.post('/delete-event', (req,res)=>{

  const q6 = 'delete from event where userId = ? and title = ?';
  connection.query(q6,[req.body.userId , req.body.title],(err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.json({ message: 'ServerError' });
    } else {
      

      const updateQuery = 'UPDATE user SET numOfEventsCreated = numOfEventsCreated - 1 WHERE id = ?';
      connection.query(updateQuery, [req.body.userId], (updateErr, updateResult) => {
        if (updateErr) {
          console.error('Error updating user table:', updateErr);
          return res.json({ message: 'ServerError' });
        } else {
          // Both event insertion and user table update were successful.
          return res.json("Event Successfully Deleted");
        }
      });

    }
  });
});


app.post('/modify-event' , (req,res)=>{
  const q5= 'update event set title= ? ,description= ?, date =? , time= ? , location = ? where userId = ? and title= ?';
  connection.query(q5, [req.body.title, req.body.description, req.body.date, req.body.time, req.body.location ,req.body.userId , req.body.titleHit], (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.json({ message: 'ServerError' });
    }else{
      res.json({message : "Event created and user table updated successfully"});
    }
  });
});

app.post('/create-event', (req, res) => {
  console.log(req.body.title);
  console.log(req.body.description);
  const query3 = 'INSERT INTO event (title, description, date, time, location, userId) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(query3, [req.body.title, req.body.description, req.body.date, req.body.time, req.body.location, req.body.userId], (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.json({ message: 'ServerError' });
    } else {
      const userId = req.body.userId;
      const updateQuery = 'UPDATE user SET numOfEventsCreated = numOfEventsCreated + 1 WHERE id = ?';
      connection.query(updateQuery, [userId], (updateErr, updateResult) => {
        if (updateErr) {
          console.error('Error updating user table:', updateErr);
          return res.json({ message: 'ServerError' });
        } else {
          // Both event insertion and user table update were successful.
          return res.json({ message: 'Event created and user table updated successfully' });
        }
      });
    }
  });
});

app.post('/login', (req, res) => {
    console.log(req.body.username);
    console.log(req.body.password);
    const username = req.body.username;
    const password = req.body.password;
  
    const query2 = 'select id, username, designation, status from user where username = ? and password = ?';
    connection.query(query2, [username, password], (err, result) => {
      if (err) {
        console.error('Error querying database:', err);
        res.json({ message: 'ServerError' });
      } 
      else if (result.length === 0) {
        res.json({ message: 'InvalidCredentials' });
      } 
      else {
        console.log(result[0].id);
  
        // login -> maintaining sessions 
        const userid = result[0].id;
        req.session.userid = userid;

        req.session.save((err) => {
          if (err) {
            console.error('Error saving session:', err);
            res.json({ message: 'ServerError' });
          } 
          else {
            console.log("Maintaining session :- " + req.session.userid);
            gloabalUserId=req.session.userid;

            const username = result[0].username;
            const status = result[0].status;
            const designation = result[0].designation;
            if (status === "accepted") {
              res.json({ message: 'AuthenticationSuccessful', userid, username, designation });
            } else {
              res.json({ message: 'UserNotApprovedYet' });
            }
          }
        });
      }
    });
  });






app.get('/getUserData', (req, res) => {
  // Check if the session ID is available
  

  if (!gloabalUserId) {
    res.json({ message: ' Session not set properly ' });
    return;
  }

  
  console.log("User session id : " + gloabalUserId);

  const queryStr = 'select * from user where id = ?';

  connection.query(queryStr, [gloabalUserId], (error, results) => {
    if (error) {
      console.error('Error fetching data:', error);
      res.json({ error: 'Server error' });
    } else {
      res.json(results);
    }
  });
});


app.get('/authorize', (req, res) => {

    const queryStr = "select * from user where status='pending'";
    
    connection.query(queryStr, (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Server error' });
      } else {
        res.json(results);
      }
    });
  });



  app.post('/authorize/accept', (req,res)=>{

    console.log(req.body.id);
    
    const q = 'update user set status = ? where id = ?';
      
    connection.query(q, ["accepted", req.body.id], (err, result) => {
      if (err) {
        console.error('Error querying database:', err);
        res.json({ message: 'ServerError' });
        return;
      }
  
      if (result.length === 0) {
        res.json({ message: 'UpdateNotPossible' });
      }
      else {
        const id=req.body.id ;
        res.json({message: 'UserAuthorized' , id });
      }
    });
  });
  
    app.post('/authorize/decline', (req,res)=>{
      const q2 = 'delete from user where id = ?';
      
      connection.query(q2, [ req.body.id], (err, result) => {
        if (err) {
          console.error('Error querying database:', err);
          res.json({ message: 'ServerError' });
          return;
        }
  
        if (result.length === 0) {
          res.json({ message: 'UpdateNotPossible' });
        }
        else{
          const id = req.body.id ;
          res.json({message: 'UserDeleted' , id});
        }
  
      });
    });




  
app.post('/logout', (req,res)=>{
    
    if (req.session) {
      // Destroy the user's session (including userId)
      req.session.destroy((err) => {
        console.log("logout clicked ");
        if (err) {
          console.error('Error destroying session:', err);
          res.status(500).json({ message: 'LogoutFailed' });
        } else {
          // Session destroyed successfully
        
          res.json({ message: 'logoutSuccess' });
        }
      });
    } 
  });





app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
