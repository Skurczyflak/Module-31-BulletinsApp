const express = require('express');
const router = express.Router();

const BulletinsController = require('../controllers/bulletins.controller');
const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUpload');
const upload = imageUpload.single('image');
const uploadFlieErrorHandling = require('../utils/uploadFlieErrorHandling');

router.get('/bulletins', BulletinsController.getAll);

router.get('/bulletins/search/:searchPhrase', BulletinsController.getBySearchPhrase);

router.get('/bulletins/:id', BulletinsController.getById);

router.post(
    '/bulletins', 
    function (req, res, next) { 
        upload(req, res, function (err) { uploadFlieErrorHandling(err, req, res, next) })
    }, 
    authMiddleware, 
    BulletinsController.addOne
);

router.put(
    '/bulletins/:id', 
    function (req, res, next) { 
        upload(req, res, function (err) { uploadFlieErrorHandling(err, req, res, next) })
    },
    authMiddleware, 
    BulletinsController.updateOne
);

router.delete('/bulletins/:id',authMiddleware, BulletinsController.deleteOne);


module.exports = router;