const jwt = require('jsonwebtoken');

const FileModel = require('../models/file');

/**
 * Fetches all file details associate with the particular user
 */
exports.showFiles = async (req, res) => {
    const decoded = jwt.verify(
        req.headers['authorization'].split(' ')[1],
        process.env.SECRET_KEY
    );

    const userId = decoded._id;

    try {
        const data = await FileModel.find({ user_id: userId });
        res.json({ msg: data });
    } catch (err) {
        res.status(500).json({ msg: err });
    }
};
