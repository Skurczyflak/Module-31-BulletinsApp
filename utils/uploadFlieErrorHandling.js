const multer = require('multer');

const uploadFlieErrorHandling = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
    return res.status(500).json({message: err.message});
    } else if (err) {
    return res.status(500).json({message: err.message});
    }
    next();
};
module.exports = uploadFlieErrorHandling