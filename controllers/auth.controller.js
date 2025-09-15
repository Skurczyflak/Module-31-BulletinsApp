const User = require('../models/users.models');
const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');
const isValidPhoneNumber = require('../utils/isValidPhoneNumber');
const fs = require('fs');

const Session = require('../models/Session.model');

exports.register = async (req, res) => {
  try {
    const { login, password, phone } = req.body;
    const fileType = req.file ? await getImageFileType(req.file.path): 'unknown';
    const isPhoneValid = await isValidPhoneNumber(phone);
    if (login && typeof login === 'string' && password && typeof password === 'string' && phone && typeof phone === 'string' && isPhoneValid && req.file && ['image/jpeg', 'image/gif', 'image/png'].includes(fileType)  ) {
      const userWithLogin = await User.findOne({ login: login });
      if (userWithLogin) {
        fs.unlinkSync(req.file.path);
        return res.status(409).json({ message: 'User with this login already exists' });
      } else {
        const user = await User.create({ login: login, password: await bcrypt.hash(password, 10), avatar: req.file.filename, phone: phone });
        return res.status(201).json({ message: `User created successfully. ID: ${user.login}` });
      }
    } else {
        if(req.file) fs.unlinkSync(req.file.path);
        return res.status(400).json({ message: 'Bad request' });
    }
  } catch (err) {
    if(req.file) fs.unlinkSync(req.file.path);
    return res.status(500).json({ message: err });
  }
};

exports.loginUser = async (req, res) => {
    try{
        const { login, password } = req.body; 
        if (login && typeof login === 'string' && password && typeof password === 'string') {
            const user = await User.findOne({ login: login });
            if(!user){
                res.status(400).send({ message: 'Login or passsowrd is incorect' });
            }else{
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if(isPasswordValid){
                    req.session.user = { login: user.login, id: user._id };
                    res.status(200).send({ message: 'Login success' });
                }else{
                    res.status(400).send({ message: 'Login or passsowrd is incorect' });
                }
            }
        } else {
            res.status(400).send({ message: 'Bad request' });
        }
    }catch(err){
        res.status(500).json({message: err});
    }
}

exports.logoutUser = async (req, res) => {
    try{
        if (process.env.NODE_ENV !== "production"){ 
            await Session.deleteMany({});
            res.status(200).send({ message: 'Logout success' });
        }else{
            req.session.destroy();
            res.status(200).send({ message: 'Logout success' });
        }
    }catch(err){
        res.status(500).json({message: `error: ${err}`});
    }
}

exports.getUser = async (req, res) => {
    try{
        res.status(200).send( req.session.user );
    }catch(err){
        res.status(500).json({ message: err });
    }
}