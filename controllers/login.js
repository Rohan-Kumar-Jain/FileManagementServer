const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

/**
 * Login controller
 */
// Using async-await
exports.login = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                // Passwords match
                const payload = {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                };
                const token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: process.env.EXPIRES_IN,
                });
                res.json({ token: token });
            } else {
                // Passwords don't match
                res.status(400).json({ msg: 'Password does not Match' });
            }
        } else {
            res.status(400).json({ msg: 'User does not exist' });
        }
    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

// // Using promises
// exports.login = (req, res) => {
//     userModel.findOne({email: req.body.email})
//         .then((user) => {
//             if (user) {
//                 if (bcrypt.compareSync(req.body.password, user.password)) {
//                     // Passwords match
//                     const payload = {
//                         _id: user._id,
//                         username: user.username,
//                         email: user.email,
//                     };
//                     const token = jwt.sign(payload, process.env.SECRET_KEY, {
//                         expiresIn: process.env.EXPIRES_IN,
//                     });
//                     res.json({ token: token });
//                 } else {
//                     // Passwords don't match
//                     res.status(400).json({ msg: 'Password does not Match' });
//                 }
//             } else {
//                 res.status(400).json({ msg: 'User does not exist' });
//             }
//         })
//         .catch((err) => {
//             res.status(500).json({ msg: err });
//         });
// };
