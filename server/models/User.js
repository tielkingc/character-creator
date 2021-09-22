const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        first_name: {
            type: String,
            required: true,
            trim: true 
        },

        last_name: {
            type: String,
            required: true,
            trim: true
        },

        username: {
            type: String,
            require: true,
            trim: true
        },

        password: {
            type: String,
            require: true,
            trim: true,
            minlength: 8
        },

        characters: {
            type: Schema.Types.ObjectId,
            ref: 'Character'
        },

        account_type: {
            type: String,
            required: true
        }
    }
)

userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
});

userSchema.methods.isCorrectPassword = async function(password) {
        return await bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;