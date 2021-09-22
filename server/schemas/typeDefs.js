const { gql } = require('apollo-server-express');

const typeDefs = gql `
    type User {
        _id: ID
        first_name: String,
        last_name: String,
        username: String,
        password: String,
        account_type: String
    }

    type Query {
        users: [User],
        user(username: String!): User
    }

    type Mutation {
        addUser(
            first_name: String!,
            last_name: String!,
            username: String!,
            password: String!,
            account_type: String!
            ): User

        login(username: String!, password: String!): User

        editUser(
            _id: ID!,
            first_name: String,
            last_name: String,
            username: String,
            password: String,
            account_type: String
        ): User

        deleteUser(_id: ID!): User 
    }
`;

module.exports = typeDefs;