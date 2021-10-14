const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError, AuthenticationError } = require('apollo-server');
const checkAuth = require('../utils/check-auth');

const { validateRegisterInput, validateLoginInput } = require('../utils/validators')
const { SECRET_KEY } = require('../config');
const User = require('../models/User');

function generateToken(user) {
    return jwt.sign({
        id: user.id,
        account_type: user.account_type,
        username: user.username
    }, SECRET_KEY, { expiresIn: '1h' })
}

module.exports = {
    Query: {
        async users() {
            try {
                const users = await User.find();
                return users;
            } catch (err) {
                throw new Error(err);
            }
        }
    },

    Mutation: {
        async login(_, { username, password }) {
            const { errors, valid } = validateLoginInput(username, password);

            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }

            const user = await User.findOne({ username });

            if (!user) {
                errors.general = 'User not found';
                throw new UserInputError('User not found', { errors });
            }

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                errors.general = 'Wrong credentials';
                throw new UserInputError('Wrong credentials', { errors });
            }

            const token = generateToken(user)

            return {
                ...user._doc,
                id: user._id,
                token
            }
        },

        async register(_, { registerInput: { first_name, last_name, username, password, confirmPassword } }) {
            // Validate user data
            const{ valid, errors } = validateRegisterInput(username, password, confirmPassword);
            if (!valid) {
                throw new UserInputError('Errors', { errors })
            }
            // Make sure user doesn't already exist
            const user = await User.findOne({ username });

            if (user) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                })
            }
            // hash password and create an auth token

            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                first_name,
                last_name,
                username,
                password,
                account_type: '',
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = generateToken(res)

            return {
                ...res._doc,
                id: res._id,
                token
            }
        },

        async deleteUser(_, { userId }, context) {
            const userInfo = checkAuth(context);
            console.log(userInfo)

            try {
                const user = await User.findById(userId);
                if (userInfo.account_type === 'admin') {
                    await user.delete();
                    return 'User deleted successfully';
                } else {
                    throw new AuthenticationError('Action not allowed!');
                }
            } catch (err) {
                throw new Error(err)
            }
        }
    }
}