const express = require('express');
const router = express.Router();

const { auth } = require('../middleware/auth');
const { validateEmail } = require('../middleware/validateEmail');

const { deleteFile } = require('../controllers/deleteFile');
const { login } = require('../controllers/login');
const { showFiles } = require('../controllers/showFiles');
const { signUp } = require('../controllers/signUp');
const { uploadFile } = require('../controllers/uploadFile');

// Used for login
router.get('/login', login);
// Used to register the user
router.post('/signup', validateEmail, signUp);
// Used to show all files uploaded by the particular user
router.get('/file', auth, showFiles);
// Used to upload the file
router.post('/upload-file', auth, uploadFile);
// Used to delete the file
router.delete('/delete-file', auth, deleteFile);

module.exports = router;
