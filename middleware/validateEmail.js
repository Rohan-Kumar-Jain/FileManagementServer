/**
 * Middleware to validate whether the email is proper or not.
 */
exports.validateEmail = (req, res, next) => {
    if (!req.body.email) {
        return res.status(400).json({ msg: 'Bad request' });
    } else if (/\S+@\S+\.\S+/.test(req.body.email)) {
        next();
    } else {
        return res.status(400).json({ msg: 'Invalid email' });
    }
};
