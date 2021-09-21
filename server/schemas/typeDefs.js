const { gql } = require('apollo-server-express');

const typeDefs = gql `
    type User {
        _id: ID
        first_name: String,
        last_name: String,
        username: String,
        password: String
    }

    type Query {
        users: [User]
    }
`;

module.exports = typeDefs;