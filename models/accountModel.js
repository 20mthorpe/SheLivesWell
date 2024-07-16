const mongodb = require('../database/connect.js');
const { link } = require('../routes/static.js');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcryptjs');
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
accountModel.findUser = async function(uname){
    try{
        const db = mongodb.getDb();
        const result = await db.db().collection('users').findOne({ username: uname });
        return result;
    } catch(err){
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
        const result = await db.db().collection('users').findOne({_id: ObjectId(id)});
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
accountModel.editUser = async function(userId, updateData){
    try{
        const db = mongodb.getDb();
        const userIdObj = new ObjectId(userId);

        if (updateData.password) {
            updateData.password_hash = await bcrypt.hash(updateData.password);
            delete updateData.password;
        }

        const result = await db.db().collection('users').updateOne({_id: userIdObj}, {$set: updateData});

        if (result.matchedCount === 0) {
            throw new Error('User not found');
        } else {
            return result;
        }
    }
    catch(err){
        console.log(err);
        throw new Error('error editing user');
    }
}


module.exports = accountModel;