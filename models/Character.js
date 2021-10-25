const { Schema, model } = require('mongoose');

const characterSchema = new Schema({
    name: String,
    strength: Number,
    dexterity: Number,
    constitution: Number,
    intelligence: Number,
    wisdom: Number,
    charisma: Number,
    username: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    createdAt: String,
    race: String,
    characterClass: String,
    level: Number
})

module.exports = model('Character', characterSchema);