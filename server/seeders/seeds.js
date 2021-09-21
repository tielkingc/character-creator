const db = require('../config/connection');
const { User } = require('../models');

db.once('open', async() => {
    await User.deleteMany();

    await User.create({
        first_name: 'Christian',
        last_name: 'Tielking',
        username: 'tielkingc',
        password: 'qwertyuiop'
    })

    console.log('User seeded');
    process.exit();
});