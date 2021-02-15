const bcrypt = require('bcryptjs');
const userModel = require('../models/user');

/**
 * Sign up controller - To register users
 */
// Using async-await
exports.signUp = async (req, res) => {
    try {
        const payload = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            confpassword: req.body.confpassword,
        };
        const user = await userModel.findOne({ email: payload.email });
        if (!user) {
            if (payload.password != payload.confpassword) {
                return res.status(400).json({ msg: 'Incorrect confpassword' });
            }
            // Hashing the password to store in db
            const hash = await bcrypt.hash(payload.password, 10);
            payload.password = hash;
            const userDetails = new userModel({
                username: payload.username,
                email: payload.email,
                password: payload.password,
            });
            // Save user details in db
            await userDetails.save();
            res.status(201).json({ msg: 'User Created Successfully' });
        } else {
            res.status(400).json({ msg: 'User already exists' });
        }
    } catch (err) {
        res.status(500).json({ msg: err });
    }
};