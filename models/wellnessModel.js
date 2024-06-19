const mongodb = require('../database/connect.js');
const { link } = require('../routes/static.js');
const ObjectId = require('mongodb').ObjectId;

const wellnessModel = {}

/* ***********************
WELLNESS API REQUESTS

These functions handle the API requests for the wellness database.
*************************/

/* GET all wellness data */
wellnessModel.getWellness = async function(req, res, next){
    //let wellness = await wellnessModel.getWellness();
    //res.json(wellness);
    try{
        const db = mongodb.getDb();
        const result = await db.db().collection('wellness').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send('error getting wellness data');
    }
}

/* GET wellness data by category */
async function getWellnessByCategory(category){
    
    try{
        
        const db = mongodb.getDb();
        const result = await db.db().collection('wellness').find({category}).toArray();
        const mediaItems = result.map(media => ({
            id: media._id,
            title: media.title,
            description: media.description,
            link: media.link,
            category: media.category,
            mediaType: media.mediaType,
            approved: media.approved
        }));
        return mediaItems
        
    } catch (err) {
        console.log(err);
        throw new Error('error getting wellness data');
    }
}

// async function getWellnessByCategory(category){
//     try{
//         const db = mongodb.getDb();
//         const result = await db.db().collection('wellness').find({category}).toArray();
//         return JSON.stringify(result);
//     } catch (err) {
//         console.log(err);
//         throw new Error('error getting wellness data');
//     }
// }
// async function getWellnessByCategory(category){
//     try{
//         const db = mongodb.getDb();
//         const result = await db.db().collection('wellness').find({category}).toArray();
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(result);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send('error getting wellness data');
//     }
// }

/* GET wellness data by ID */
wellnessModel.getWellnessById = async function(req, res, next){
    try{
        const db = mongodb.getDb();
        const result = await db.db().collection('wellness').findOne({_id: ObjectId(req.params.id)});
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send('error getting wellness data');
    }
}

// /* POST new wellness data */
// wellnessModel.postWellness = async function(req, res, next){
//     try{
//         const db = mongodb.getDb();
//         const result = await db.db().collection('wellness').insertOne(req.body);
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(result);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send('error posting wellness data');
//     }
// }

// /* PUT updated wellness data */
// wellnessModel.putWellness = async function(req, res, next){
//     try{
//         const db = mongodb.getDb();
//         const result = await db.db().collection('wellness').updateOne({_id: ObjectId(req.params.id)}, {$set: req.body});
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(result);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send('error updating wellness data');
//     }
// }

// /* DELETE wellness data */
// wellnessModel.deleteWellness = async function(req, res, next){
//     try{
//         const db = mongodb.getDb();
//         const result = await db.db().collection('wellness').deleteOne({_id: ObjectId(req.params.id)});
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(result);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send('error deleting wellness data');
//     }
// }

module.exports =  {wellnessModel, getWellnessByCategory};