//tm
//ie9BcJk5q9nacUvL
// connection : mongodb+srv://tm:<password>@cluster0-cqn0u.mongodb.net/<dbname>?retryWrites=true&w=majority
//'https://media.gettyimages.com/photos/hot-chili-peppers-picture-id183263273?s=612x612

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

const app = express();
mongoose.connect('mongodb+srv://tm:ie9BcJk5q9nacUvL@cluster0-cqn0u.mongodb.net/<dbname>?retryWrites=true&w=majority')
  .then(() => {
    console.log('successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

// app.post('/api/auth/login', (req, res, next) => {
//   //console.log(req.body);
//   res.status(201).json({
//     message: 'logged in'

//   });
// });

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

// app.get('/api/sauces', (req, res, next) => {
//   const sauce = [
//     {
//       _id: 'sdsdsdsd',
//       userId: 'mildsaucesID',
//       name: 'Mild sauce',
//       manufacturer: 'Mild Peppers ltd',
//       description: 'A mild sauces.',
//       mainPepper: 'Green pepper',
//       imageUrl: 'https://media.gettyimages.com/photos/hot-chili-peppers-picture-id183263273?s=612x612',
//       heat: 5,
//       likes: 7,
//       dislikes: 5,
//       usersLiked: ['asasa'],
//       usersDisliked: ['Strisasang'],
//     },
//     {
//       _id: 'dfgdfgf',
//       userId: 'hotsaucesID',
//       name: 'Hot sauce',
//       manufacturer: 'Hot Peppers ltd',
//       description: 'A Hot sauces.',
//       mainPepper: 'Res pepper',
//       imageUrl: 'https://media.gettyimages.com/photos/hot-chili-peppers-picture-id183263273?s=612x612',
//       heat: 10,
//       likes: 7,
//       dislikes: 5,
//       usersLiked: ['asasa'],
//       usersDisliked: ['Strisasang'],
//     },
//   ];
//   res.status(200).json(sauce);
// });

module.exports = app;