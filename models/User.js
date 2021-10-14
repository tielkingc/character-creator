const { Schema, model } = require('mongoose');

const userScheama = new Schema({
    first_name: String,
    last_name: String,
    username: String,
    password: String,
    account_type: String,
    createdAt: String
});

module.exports = model('User', userScheama);