const Sauce = require('../models/sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    req.body.sauce = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
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

    sauce.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved successfully!'
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


exports.likeSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    }).then(
        (sauce) => {
            if (req.body.like === 1) {
                if (sauce.usersLiked.length === 0) {
                    sauce.usersLiked.push(req.body.userId);
                    sauce.likes += 1;
                } else {
                    let alreadyLiked = false;
                    for (let i = 0; i < sauce.usersLiked.length; i++) {
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

            if (req.body.like === -1) {
                if (sauce.usersDisliked.length === 0) {
                    sauce.usersDisliked.push(req.body.userId);
                    sauce.dislikes += 1;
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

            if (req.body.like === 0) {
                if (sauce.usersLiked.length > 0) {
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
            Sauce.updateOne({ _id: req.params.id }, sauce).then(
                () => {
                    res.status(201).json({
                        message: 'Thing updated successfully!'
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
                message: 'Thing updated successfully!'
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
            fs.unlink('images/' + filename, () => {
                Sauce.deleteOne({ _id: req.params.id }).then(
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