const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');

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
            return user;
        }
    }
}

module.exports = resolvers;