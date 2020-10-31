const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },       //all fields are required
    name: { type: String,   required: true },       //definition of the database
    manufacturer: { type: String,  required: true },
    description: { type: String,  required: true },
    mainPepper: { type: String,  required: true },
    imageUrl: { type: String,  required: true },
    heat: { type: Number,  required: true },
    likes: { type: Number,  required: true },
    dislikes: { type: Number,  required: true },
    usersLiked: { type: [String],  required: true },
    usersDisliked: { type: [String],  required: true },
});

module.exports = mongoose.model('Sauce', sauceSchema);