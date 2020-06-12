//tm
//ie9BcJk5q9nacUvL
// connection : mongodb+srv://tm:<password>@cluster0-cqn0u.mongodb.net/<dbname>?retryWrites=true&w=majority


const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


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

app.post('/api/auth/signup', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'signed up'
    
  });
});

app.post('/api/auth/login', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'logged in'
    
  });
});

app.post('/api/sauces', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({  
    message: 'done!' 
  });
});

//Display all sauces
app.get('/api/sauces', (req, res, next) => {
  const sauce = [
    {
      _id : 'sdsdsdsd',
      userId : 'mildsaucesID',
      name : 'Mild sauce',
      manufacturer : 'Mild Peppers ltd',
      description : 'A mild sauces.',
      mainPepper : 'Green pepper',
      imageUrl : 'https://media.gettyimages.com/photos/hot-chili-peppers-picture-id183263273?s=612x612' ,
      heat : 5,
      likes : 7,
      dislikes : 5,
      usersLiked : ['String'],
      usersDisliked : ['String'],
    },
    {
      _id : 'dfdfdfd',
      userId : 'hotsaucesID',
      name : 'Hot sauce',
      manufacturer : 'Hot Peppers ltd',
      description : 'A hot sauces.',
      mainPepper : 'red pepper',
      imageUrl : 'https://media.gettyimages.com/photos/hot-chili-peppers-picture-id183263273?s=612x612' ,
      heat : 10,
      likes : 2,
      dislikes : 56,
      usersLiked : ['String'],
      usersDisliked : ['String'],
    },
  ];
  res.status(200).json(sauce);
});

// app.get('/api/sauces/:id', (req, res, next) => {
//   sauces.findOne({
//     _id: req.params.id
//   }).then(
//     (sause) => {
//       res.status(200).json(sauce);
//     }
//   ).catch(
//     (error) => {
//       res.status(404).json({
//         error: error
//       });
//     }
//   );
// });

module.exports = app;