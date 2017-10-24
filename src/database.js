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

const User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    }
});

// force: true will drop the table if it already exists
User.sync({force: true}).then(() => {
    console.log('User Created Successfully');
    // Table created
    return User.create({
      firstName: 'John',
      lastName: 'Hancock'
    });
});

// force: true will drop the table if it already exists
User.sync({force: true}).then(() => {
    User.findAll().then(users => {
        console.log(users)
    });
});