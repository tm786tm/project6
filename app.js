//tm
//ie9BcJk5q9nacUvL
// connection : mongodb+srv://tm:<password>@cluster0-cqn0u.mongodb.net/<dbname>?retryWrites=true&w=majority
//'https://media.gettyimages.com/photos/hot-chili-peppers-picture-id183263273?s=612x612

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

const app = express();    //connect to the mongoDB atlas database
mongoose.connect('mongodb+srv://tm:ie9BcJk5q9nacUvL@cluster0-cqn0u.mongodb.net/hotSauces?retryWrites=true&w=majority')
  .then(() => {
    console.log('successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });


app.use((req, res, next) => {   //middleware to allow requests from all origins
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;