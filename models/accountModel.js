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

/* ***********************
Find a user by username
*************************/
accountModel.findUser = async function(username){
    try{
        const db = mongodb.getDb();
        const result = await db.db().collection('users').findOne({username});
        return result;
    }
    catch(err){
        console.log(err);
        throw new Error('error finding user');
    }
}

/* ***********************
Find a user by email
*************************/
accountModel.findUserByEmail = async function(email){
    try{
        const db = mongodb.getDb();
        const result = await db.db().collection('users').findOne({email});
        return result;
    }
    catch(err){
        console.log(err);
        throw new Error('error finding user');
    }
}

/* ***********************
login a user
*************************/
accountModel.loginUser = async function(username, password){
    try{
        const db = mongodb.getDb();
        const result = await db.db().collection('users').findOne({username, password_hash: password});
        return result;
    }
    catch(err){
        console.log(err);
        throw new Error('error finding user');
    }
}

/* ***********************
Find a user by ID
*************************/
accountModel.findUserById = async function(id){
    try{
        const db = mongodb.getDb();
        const result = await db.db().collection('users').findOne({_id: ObjectId(id)
        });
        return result;
    }
    catch(err){
        console.log(err);
        throw new Error('error finding user');
    }
}

/* ***********************
Edit a user
*************************/
accountModel.editUser = async function(user){
    try{
        const db = mongodb.getDb();
        const result = await db.db().collection('users').updateOne({_id: ObjectId(user.id)}, {$set: user});
        return result;
    }
    catch(err){
        console.log(err);
        throw new Error('error editing user');
    }
}


module.exports = accountModel;