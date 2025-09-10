const Bulletins = require('../models/bulletins.model');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');

exports.getAll = async (req, res) =>{
    try{
        res.json(await Bulletins.find().populate('sellerId'));
    }catch(err)
    {
        res.status(500).json({message: err});
    }
}

exports.getBySearchPhrase = async (req, res) => {
    try{
        res.json(await Bulletins.find({title: {$regex: req.params.searchPhrase, $options: 'i'}}));
    }catch(err){
        res.status(500).json({message: err});
    }
}

exports.getById = async (req, res) => {
    try{
        const bulletins = await Bulletins.findById(req.params.id).populate('sellerId');
        if(!bulletins) res.status(404).json({message: 'Not found'});
        else res.json(bulletins);
    }catch(err){
        res.status(500).json({message: err});
    }
}

exports.addOne = async(req, res) => {
    try{
        const {title, content, dateOfPost, price, location} = req.body;
        const sellerId = req.session.user.id;
        const fileType = req.file ? await getImageFileType(req.file.path): 'unknown';
        
        if( title && typeof title === 'string' && content && typeof content === 'string' && dateOfPost && typeof dateOfPost === 'string' && price && typeof price === 'string' && location && typeof location === 'string' && sellerId && req.file && ['image/jpeg', 'image/gif', 'image/png'].includes(fileType) ){
            const bulletin = await Bulletins.create({title: title, content: content, dateOfPost: dateOfPost, image: req.file.filename, price: price, location: location, sellerId: sellerId});
            return res.status(201).json({message: `Bulletin created successfully. ID: ${bulletin._id}`});
        }else{
            fs.unlinkSync(req.file.path);
            res.status(400).json({message: 'Bad request'});
        }

    }catch(err){
        fs.unlinkSync(req.file.path);
        res.status(500).json({message: err});
    }
}

exports.updateOne = async(req, res) => {
    try{
        const {title, content, dateOfPost, price, location} = req.body;
        const fileType = req.file ? await getImageFileType(req.file.path): 'unknown'; 
        const bulletins = await Bulletins.findById(req.params.id);
        if(bulletins.sellerId !== req.session.user.id){
            return res.status(403).json({message: 'Forbidden'});
        }else{
            const update = {};
            if(title && typeof title === 'string') update.title = title;
            if(content && typeof content === 'string') update.content = content;
            if(dateOfPost && typeof dateOfPost === 'string') update.dateOfPost = dateOfPost;
            if(price && typeof price === 'string') update.price = price;
            if(location && typeof location === 'string') update.location = location;
            if(req.file && ['image/jpeg', 'image/gif', 'image/png'].includes(fileType)){ update.image = req.file.filename, fs.unlinkSync(`./public/uploads/${bulletins.image}`); };
            await Bulletins.updateOne({_id: req.params.id}, {$set: update});
            res.json({message: 'Bulletin updated successfully'});
        }
    }catch(err){
        if(req.file) fs.unlinkSync(req.file.path);
        res.status(500).json({message: err});
    }
}

exports.deleteOne = async(req, res) => {
    try{
        const bulletinsFound = await Bulletins.findById(req.params.id);
        if(!bulletinsFound) res.status(404).json({message: 'Not found'});
        else{
            await Bulletins.deleteOne({_id: req.params.id});
            fs.unlinkSync(`./public/uploads/${bulletinsFound.image}`);
            const bulletins = await Bulletins.find();
            res.json(bulletins);
        }
    }catch(err){
        res.status(500).json({message: err});
    }
}
