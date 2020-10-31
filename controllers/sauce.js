const Sauce = require('../models/sauce');
const fs = require('fs');


//create sauce
exports.createSauce = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    req.body.sauce = JSON.parse(req.body.sauce);
    const sauce = new Sauce({   //create the sauce
        userId: req.body.sauce.userId,
        name: req.body.sauce.name,
        manufacturer: req.body.sauce.manufacturer,
        description: req.body.sauce.description,
        imageUrl: url + '/images/' + req.file.filename,
        mainPepper: req.body.sauce.mainPepper,
        heat: req.body.sauce.heat,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });

    sauce.save().then(  //save the sauce
        () => {
            res.status(201).json({
                message: 'Post saved successfully!'
            });
        }
    ).catch(    //catch errors and send 400 status
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

//get the single requested sauce using id
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    }).then(
        (sauce) => {
            res.status(200).json(sauce);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

//code for like and dislike
exports.likeSauce = (req, res, next) => {
    Sauce.findOne({     //get the sauce
        _id: req.params.id
    }).then(
        (sauce) => {
            console.log('-----------------------------------');
            if (req.body.like === 1) {          //if 1 is received from the frontend to add a like
                if (sauce.usersLiked.length === 0) {        //execute if tere are 0 likes
                    sauce.usersLiked.push(req.body.userId);     //add to the array
                    sauce.likes += 1;                           //increment by 1
                    console.log('New Like');
                } else {
                    let alreadyLiked = false;
                    for (let i = 0; i < sauce.usersLiked.length; i++) {     //To check if already liked
                        if (sauce.usersLiked[i] === req.body.userId) {
                            alreadyLiked = true;
                        }
                    }
                    if (!alreadyLiked) {
                        sauce.likes += 1;
                        console.log('New Like');
                        sauce.usersLiked.push(req.body.userId);
                    }
                }
            }

            if (req.body.like === -1) {         //if -1 is received from the frontend to add a dislike
                if (sauce.usersDisliked.length === 0) {
                    sauce.usersDisliked.push(req.body.userId);
                    sauce.dislikes += 1;
                    console.log('New dislike');
                } else {
                    let alreadyDisliked = false;
                    for (let i = 0; i < sauce.usersDisliked.length; i++) {
                        if (sauce.usersDisliked[i] === req.body.userId) {
                            alreadyDisliked = true;
                        }
                    }
                    if (!alreadyDisliked) {
                        sauce.dislikes += 1;
                        console.log('New dislike');
                        sauce.usersDisliked.push(req.body.userId);
                    }
                }
            }

            if (req.body.like === 0) {          //if 0 is received from the frontend to remove a like or dislike
                if (sauce.usersLiked.length > 0) {      //only execute if not empty
                    for (let i = 0; i < sauce.usersLiked.length; i++) {
                        if (sauce.usersLiked[i] === req.body.userId) {
                            sauce.likes -= 1;
                            sauce.usersLiked.splice(i, 1);
                            console.log('Removed like');
                        }
                    }
                }
                if (sauce.usersDisliked.length > 0) {
                    for (let i = 0; i < sauce.usersDisliked.length; i++) {
                        if (sauce.usersDisliked[i] === req.body.userId) {
                            sauce.dislikes -= 1;
                            sauce.usersDisliked.splice(i, 1);
                            console.log('Removed dislike');
                        }
                    }
                }
            }
            
            console.log(sauce.likes + ' like ' + 'and ' + sauce.dislikes + ' dislikes.');
            console.log('Liked by ' + sauce.usersLiked);
            console.log('Disliked by ' + sauce.usersDisliked);
            console.log('-----------------------------------');
            Sauce.updateOne({ _id: req.params.id }, sauce).then(        //method used to update the record
                () => {
                    res.status(201).json({          //on success give a a 201 status code
                        message: 'Sauce updated successfully!'
                    });
                }
            ).catch(
                (error) => {
                    res.status(400).json({
                        error: error
                    });
                }
            );
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );

};

exports.modifySauce = (req, res, next) => {
    let sauce = new Sauce({ _id: req.params._id });
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');

        req.body.sauce = JSON.parse(req.body.sauce);

                //user inputs passed and saved from te frontend
        
        sauce = {                   
            _id: req.params.id,
            userId: req.body.sauce.userId,
            name: req.body.sauce.name,
            manufacturer: req.body.sauce.manufacturer,
            description: req.body.sauce.description,
            imageUrl: url + '/images/' + req.file.filename,
            mainPepper: req.body.sauce.mainPepper,
            heat: req.body.sauce.heat,
        };
        console.log(req.body);
    } else {
        sauce = {
            _id: req.params.id,
            userId: req.body.userId,
            name: req.body.name,
            manufacturer: req.body.manufacturer,
            description: req.body.description,
            mainPepper: req.body.mainPepper,
            heat: req.body.heat
        };

    }

    Sauce.updateOne({ _id: req.params.id }, sauce).then(
        () => {
            res.status(201).json({
                message: 'Sauce updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }).then(
        (sauce) => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink('images/' + filename, () => {             //delete the image
                Sauce.deleteOne({ _id: req.params.id }).then(   //delete the record
                    () => {
                        res.status(200).json({
                            message: 'Deleted!'
                        });
                    }
                ).catch(
                    (error) => {
                        res.status(400).json({
                            error: error
                        });
                    }
                );
            });
        }
    );
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find().then(
        (sauce) => {
            res.status(200).json(sauce);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};