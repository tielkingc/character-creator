const { gql } = require('apollo-server-express');

const typeDefs = gql `
    type User {
        id: ID!
        first_name: String!
        last_name: String!
        token: String!
        username: String!
        createdAt: String!
        account_type: String!
    }

    input RegisterInput {
        first_name: String!
        last_name: String!
        username: String!
        password: String!
        confirmPassword: String!
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
        register(registerInput: RegisterInput): User!

        login(username: String!, password: String!): User

        editUser(
            _id: ID!,
            first_name: String,
            last_name: String,
            username: String,
            password: String,
            account_type: String
        ): User

        deleteUser(userId: ID!): String!
        
        addCharacter(
            name: String
        ): Character
    }
`;

module.exports = typeDefs;