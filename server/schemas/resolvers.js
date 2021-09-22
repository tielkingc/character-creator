const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const { signToken } = require('../utils/auth')

const resolvers = {
    Query: {
        users: async () => {
            return User.find()
        },

        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -pasword')
        }
    },
    
    Mutation: {
        addUser: async (parents, args) => {
            const user = await User.create(args);

            return user;
        },

        editUser: async (parents, args) => {
            args.password = await bcrypt.hash(args.password, 10)

            const user = await User.findOneAndUpdate(
                { _id: args._id },
                { first_name: args.first_name, last_name: args.last_name, username: args.username, password: args.password },
                { new: true }
            )
            return user
        },

        deleteUser: async (parents, args) => {
            const user = await User.findOneAndDelete({ _id: args._id })
            return user
        },
        
        login: async (parents, { username, password }) => {
            const user = await User.findOne({ username })

            if (!user) {
                throw new AuthenticationError('Incorrect credentials')
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials')
            }

            console.log(`${username} is logged in!`);

            const token = signToken(user)

            return { token, user };
        },

        addCharacter: async (parents, args, context) => {
            console.log(context.user)
            if (context.user) {
                const character = await Character.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { characters: character._id } },
                    { new: true }
                );

                return character
            }

            throw new AuthenticationError('You need to be logged in!');
        }
    }
}

module.exports = resolvers;