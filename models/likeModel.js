// const mongodb = require('../database/connect.js');
// //const { link } = require('../routes/static.js');
// const ObjectId = require('mongodb').ObjectId;
// //const bcrypt = require('bcryptjs');
// const likeModel = {}
// const wellnessModel = require('./wellnessModel');

// /* ***********************
// Like a media item
// *************************/
// likeModel.likeMedia = async function(media_id, user_id){
//     try{
//         const db = mongodb.getDb();

//         const user_idObj = new ObjectId(user_id);
//         //const media_idObj = new ObjectId(media_id);
//         const result = await db.db().collection('likes').insertOne({media_id: media_id, user_id: user_idObj});
//         return result;
//     } catch (err) {
//         console.log(err);
//         throw new Error('error liking media');
//     }
// }

// /* ***********************
// Get all liked media items
// *************************/
// likeModel.getLikedByUser = async function(userId){
//     try{
//         const db = mongodb.getDb();
//         const userIdObj = new ObjectId(userId);
//         const result = await db.db().collection('likes').find({user_id: userIdObj}).toArray();
//         return result;
//     } catch (err) {
//         console.log(err);
//         throw new Error('error getting liked media');
//     }
// }

// /* ***********************
// Unlike a media item
// *************************/
// likeModel.unlikeMedia = async function(likedId){
//     try{
//         const db = mongodb.getDb();
//         const likedIdObj = new ObjectId(likedId);
//         const result = await db.db().collection('likes').deleteOne({_id: likedIdObj});
//         return result;
//     } catch (err) {
//         console.log(err);
//         throw new Error('error unliking media');
//     }
// }

// /* ***********************
// Check if a media item is liked
// *************************/
// likeModel.checkIfLiked = async function(media_id, user_id){
//     try{
//         const db = mongodb.getDb();
//         const media_idObj = new ObjectId(media_id);
//         const user_idObj = new ObjectId(user_id);
//         const result = await db.db().collection('likes').findOne({user_id: user_idObj, media_id: media_idObj});
//         return result;
//     } catch (err) {
//         console.log(err);
//         throw new Error('error checking if media is liked');
//     }
// }


// module.exports = likeModel