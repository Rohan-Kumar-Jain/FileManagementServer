/**
 * Middleware to validate whether the email is proper or not.
 */
exports.validateEmail = (req, res, next) => {
    if (/\S+@\S+\.\S+/.test(req.body.email)) {
        next();
    } else {
        return res.status(400).json({ msg: 'Invalid email' });
    }
};
