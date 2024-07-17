const mongodb = require('../database/connect.js');
//const { link } = require('../routes/static.js');
const ObjectId = require('mongodb').ObjectId;
//const bcrypt = require('bcryptjs');
const likeModel = {}
const wellnessModel = require('./wellnessModel');

/* ***********************
Like a media item
*************************/
likeModel.likeMedia = async function(media_id){
    try{
        const db = mongodb.getDb();
        // I need to get the media_id when the user clicks the like button. I'm not sure how to do that.
        // FIX THIS
        const media = await wellnessModel.getWellnessById(media_id);
        const result = await db.db().collection('likes').insertOne(media);
        return result;
    } catch (err) {
        console.log(err);
        throw new Error('error liking media');
    }
}

/* ***********************
Get all liked media items
*************************/
likeModel.getLikedByUser = async function(req, res, next){
    try{
        const db = mongodb.getDb();
        const result = await db.db().collection('likes').find({user_id: req.params.user_id}).toArray();
        return result;
    } catch (err) {
        console.log(err);
        throw new Error('error getting liked media');
    }
}

/* ***********************
Unlike a media item
*************************/
likeModel.unlikeMedia = async function(req, res){
    try{
        const db = mongodb.getDb();
        const result = await db.db().collection('likes').deleteOne({user_id: req.params.user_id, media_id: req.params.media_id});
        return result;
    } catch (err) {
        console.log(err);
        throw new Error('error unliking media');
    }
}


module.exports = likeModel