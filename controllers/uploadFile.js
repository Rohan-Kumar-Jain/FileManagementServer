const jwt = require('jsonwebtoken');
const s3 = require('./s3obj').s3obj;

const FileModel = require('../models/file');

/**
 * Used to upload the file
 * NOTE - At a time, only single file can be uploaded..
 */
// Using async-await
exports.uploadFile = async (req, res) => {
    const decoded = jwt.verify(
        req.headers['authorization'].split(' ')[1],
        process.env.SECRET_KEY
    );

    if (!req.files) {
        return res.status(400).json({ msg: 'Please add the file' });
    }

    const userId = decoded._id;
    const fileName = req.files.file.name;
    const data = req.files.file.data;
    const type = req.files.file.mimetype;
    try {
        const params = {
            Bucket: process.env.AWSBucketName,
            Key: fileName,
            ContentType: type,
            Body: data,
        };
        const file = await FileModel.findOne({
            user_id: userId,
            file_name: fileName,
        });
        if (!file) {
            // If file not exist then add it to s3 and db as well.
            const data = await s3.upload(params).promise();
            urlData = {
                user_id: userId,
                file_name: fileName,
                link: data.Location,
            };

            const urldata = await FileModel.create(urlData);
            res.json({ msg: urldata }); // successfully
        } else {
            // If file already exist in db return its global url form db.
            res.status(200).json({ msg: file });
        }
    } catch (err) {
        const params = {
            Bucket: process.env.AWSBucketName,
            Key: fileName,
        };
        // Delete s3 object for consistency
        await s3.deleteObject(params).promise();
        res.status(500).json({ msg: err });
    }
};