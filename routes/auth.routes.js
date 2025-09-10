const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');
const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUpload');
const upload = imageUpload.single('avatar');
const uploadFlieErrorHandling = require('../utils/uploadFlieErrorHandling');

router.post( 
    '/register', 
    function (req, res, next) { 
        upload(req, res, function (err) { uploadFlieErrorHandling(err, req, res, next) })
    }, 
    AuthController.register
);

router.post('/login', AuthController.loginUser);

router.delete('/logout', authMiddleware, AuthController.logoutUser);

router.get('/user', authMiddleware, AuthController.getUser);

module.exports = router;