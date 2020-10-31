//middleware for authentication

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {       //check for token
        const token = req.headers.authorization.split(' ')[1];          //token based authentication
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');  //check if token is valid
        const userId = decodedToken.userId;                             //get the userID
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch {   
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};