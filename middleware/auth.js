const jwt = require('jsonwebtoken');

/**
 * Middleware to check whether the user is valid or not
 */
exports.auth = (req, res, next) => {
    if (req.headers['authorization']) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(
            token,
            process.env.SECRET_KEY,
            function (error, decodedData) {
                if (error) {
                    return res.status(401).json({
                        msg: 'Incorrect or Expired Link',
                    });
                }
                next();
            }
        );
    } else {
        return res.status(401).json({ msg: 'Authentication Error' });
    }
};
