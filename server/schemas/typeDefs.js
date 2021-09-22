const { gql } = require('apollo-server-express');

const typeDefs = gql `
    type User {
        _id: ID,
        first_name: String,
        last_name: String,
        username: String,
        password: String,
        account_type: String,
        characters: [Character]
    }

    type Character {
        _id: ID,
        name: String,
        created_By: [User]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User],
        user(username: String!): User
        characters: [Character]
    }

    type Mutation {
        addUser(
            first_name: String!,
            last_name: String!,
            username: String!,
            password: String!,
            account_type: String!
            ): User

        login(username: String!, password: String!): Auth

        editUser(
            _id: ID!,
            first_name: String,
            last_name: String,
            username: String,
            password: String,
            account_type: String
        ): User

        deleteUser(_id: ID!): User
        
        addCharacter(
            name: String
        ): Character
    }
`;

module.exports = typeDefs;