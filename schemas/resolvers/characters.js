const checkAuth = require('../../utils/check-auth');
const { validateRegisterInput, validateLoginInput } = require('../../utils/validators');
const Character = require('../../models/Character');

module.exports = {



    Query: {
        async getCharacters() {
            try {
                const characters = await Character.find();
                return characters
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
        }
    }
}