const checkAuth = require('../../utils/check-auth');
const Character = require('../../models/Character');
const { AuthenticationError } = require('apollo-server');

module.exports = {



    Query: {
        async getCharacters() {
            try {
                const characters = await Character.find();
                return characters
            } catch (err) {
                throw new Error(err);
            }
        },

        async getCharacter(_, { characterId }) {
            const character = await Character.findById(characterId);
            try {
                if (character) {
                    return character;
                } else {
                    throw new Error('Character not found!');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },

    Mutation: {
        async addManualCharacter(_, { baseStats: { name, strength, dexterity, constitution, intelligence, wisdom, charisma } }, context) {
            const user = checkAuth(context);

            const newCharacter = new Character({
                name, strength, dexterity, constitution, intelligence, wisdom, charisma,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            });

            const character = await newCharacter.save();
            return character;
        },

        async deleteCharacter(_, { characterId }, context) {
            const user = checkAuth(context);

            try {
                const character = await Character.findById(characterId);
                if (user.username === character.username) {
                    await character.delete();
                    return 'Character has been deleted';
                } else {
                    throw new AuthenticationError('Action not allowed')
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    }
}