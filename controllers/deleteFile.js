const jwt = require('jsonwebtoken');
const s3 = require('./s3obj').s3obj;

const FileModel = require('../models/file');

/**
 * Used to delete the file
 */
exports.deleteFile = async (req, res) => {
    const decoded = jwt.verify(
        req.headers['authorization'].split(' ')[1],
        process.env.SECRET_KEY
    );

    const session = await FileModel.startSession();
    session.startTransaction();
    try {
        const userId = decoded._id;
        const fileName = req.body.fileName;

        const data = await FileModel.findOne({user_id: userId,file_name: fileName});
        if (data) {
            const params = {
                Bucket: process.env.AWSBucketName,
                Key: fileName,
            };
            // delete row from db
            await FileModel.deleteOne({user_id: userId,file_name: fileName},{ session });
            // delete object form s3
            await s3.deleteObject(params).promise();
            // If successfull, commmit transaction
            await session.commitTransaction();
            session.endSession();
            res.json({msg: 'File Successfully Deleted!'});
        } else {
            // Bad request
            session.endSession();
            res.status(400).json({
                msg: 'No such file is present.',
            });
        }
    } catch (err) {
        //  If fail, rollback transaction
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ msg: err });
    }
};