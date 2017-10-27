import Sequelize from 'sequelize';

 var sequelize = new Sequelize('mainDB', null, null, {
    dialect: 'sqlite',
    storage: './test.sqlite'
});

sequelize
    .authenticate()
    .then(function(err) {
    console.log('Connection has been established successfully.');
    }, function (err) {
    console.log('Unable to connect to the database:', err);
    });

export const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }
});

// force: true will drop the table if it already exists
User.sync({force: true}).then(() => {
    console.log('User Created Successfully');
    // Table created
    return User.create({
        username: 'Ibrahim Zahoor',
        password: 'QBatch123',
        email: 'ibrahim.zahoor@gmail.com'
    });
});

// force: true will drop the table if it already exists
User.sync({force: true}).then(() => {
    User.findAll().then(users => {
        console.log(users)
    });
});

sequelize.sync().then(function() {
    User.create({
        username: "Bilal Shah",
        password: "QBatch123",
        email: "bilal.shah@gmail.com"
    });

    User.create({
        username: "abc",
        password: "123",
        email: "abc.123@gmail.com"
    });
}).catch(function(e) {
    console.log("ERROR SYNCING WITH DB", e);
});