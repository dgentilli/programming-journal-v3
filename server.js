const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const journal = require('./api/journal');
const author = require('./api/author');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** API Routes Go Here */
app.use('/api/journal', journal);
app.use('/api/author', author);

/** PRODUCTION CODE ONLY
 *Serve static files from the React frontend app
 */
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
}

/** Connect to Mongo DB */
const dbURI = process.env.mongoURI;
mongoose.connect(dbURI, { useNewUrlParser: true }).then(
  () => {
    console.log('MongoDB connection established');
  },
  (err) => {
    console.log('Error connecting Database instance due to: ', err);
  }
);

/** Run the server */
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
