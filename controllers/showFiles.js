const jwt = require('jsonwebtoken');

const FileModel = require('../models/file');

/**
 * Fetches all file details associate with the particular user
 */
exports.showFiles = (req, res) => {
    const decoded = jwt.verify(
        req.headers['authorization'].split(' ')[1],
        process.env.SECRET_KEY
    );

    const userId = decoded._id;

    FileModel.find({ user_id: userId })
        .then((data) => {
            res.json({ msg: data });
        })
        .catch((err) => {
            res.status(500).json({ msg: err });
        });
};
