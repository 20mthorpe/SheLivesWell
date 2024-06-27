const mongodb = require('../database/connect.js');
const { link } = require('../routes/static.js');
const ObjectId = require('mongodb').ObjectId;

const accountModel = {}

/* ***********************
Register a new user
*************************/
accountModel.registerUser = async function(user){
    try{
        const db = mongodb.getDb();
        const result = await db.db().collection('users').insertOne(user);
        return result;
    } catch (err) {
        console.log(err);
        throw new Error('error registering user');
    }
}