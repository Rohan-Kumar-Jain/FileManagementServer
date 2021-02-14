const bcrypt = require('bcryptjs');
const userModel = require('../models/user');

/**
 * Sign up controller - To register users
 */
exports.signUp = (req, res) => {
    const payload = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        confpassword: req.body.confpassword
    };

    userModel
        .findOne({ email: payload.email })
        .then((user) => {
            if (!user) {
                if(payload.password !=payload.confpassword){
                    return res.status(400).json({ msg: 'Incorrect confpassword' });
                }
                bcrypt.hash(payload.password, 10, (err, hash) => {
                    // Hashing the password to store in db
                    payload.password = hash;
                    const userDetails = new userModel({
                        username: payload.username,
                        email: payload.email,
                        password: payload.password,
                    });
                    userDetails.save((err, doc) => {
                        if (err) return res.status(500).json({ msg: err });
                        res.status(201).json({ msg: 'User Created Successfully' });
                    });
                });
            } else {
                res.status(400).json({ msg: 'User already exists' });
            }
        })
        .catch((err) => {
            res.status(500).json({ msg: err });
        });
};
