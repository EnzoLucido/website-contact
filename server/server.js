// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes



app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// server.js continued
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // In-memory database for demonstration purposes

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS forms (name TEXT, email TEXT, message TEXT)');

  app.post('/submitForm', (req, res) => {
    const formData = req.body;
  
    // Save the data to the SQLite database
    db.run('INSERT INTO forms (name, email, message) VALUES (?, ?, ?)', 
      formData.name, formData.email, formData.message, (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'Internal Server Error' });
        } else {
          res.json({ message: 'Form submitted successfully!' });
          console.log('Form submitted successfully!');
          console.log(formData);
        }
      });
  });

  app.get('/getFormData', (req, res) => {
    db.all('SELECT * FROM forms', (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        //console.log(rows);
        res.json(rows);
      }
    });
  });

});

// Close the database when the server stops
/*process.on('SIGINT', () => {
  db.close();
  process.exit();
});*/
