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

    input BaseStats {
        name: String
        strength: Int
        dexterity: Int
        constitution: Int
        intelligence: Int
        wisdom: Int
        charisma: Int
    }

    type Character {
        _id: ID,
        name: String,
        username: String,
        createdAt: String
        strength: Int
        dexterity: Int
        constitution: Int
        intelligence: Int
        wisdom: Int
        charisma: Int
    }

    type Query {
        users: [User],
        user(username: String!): User
        getCharacters: [Character]
        getCharacter(characterId: ID!): Character!
    }

    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User
        deleteUser(userId: ID!): String!
        addManualCharacter(baseStats: BaseStats): Character!
        deleteCharacter(characterId: ID!): String!
    }
`;

module.exports = typeDefs;