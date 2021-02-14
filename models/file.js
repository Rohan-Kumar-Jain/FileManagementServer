const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    file_name: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    }
})
fileSchema.index({'user_id': 1, 'file_name': 1}, {unique: true});

const FileModel = mongoose.model('files', fileSchema);
module.exports = FileModel;