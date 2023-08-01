const { createConnection } = require('mysql2');

let connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'asbnbnassd123456',
    database: 'codesy_todoapp'
});


connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
  });
  
  
module.exports = connection;