const { Schema, model } = require('mongoose');

const characterSchema = new Schema(
    {
        name: {
            type: String
        },

        created_By: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }
)

const Character = model('Character', characterSchema);

module.exports = Character;