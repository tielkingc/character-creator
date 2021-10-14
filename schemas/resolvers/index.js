const usersResolvers = require('./users');
const charactersResolvers = require('./characters');

module.exports = {
    Query: {
        ...usersResolvers.Query,
        ...charactersResolvers.Query
    },

    Mutation: {
        ...usersResolvers.Mutation,
        ...charactersResolvers.Mutation
    }
}