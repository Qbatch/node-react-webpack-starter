import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';

const sequelize = new Sequelize('mainDB', null, null, {
  dialect: 'sqlite',
  storage: './test.sqlite'
});
const saltRounds = 10;

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  }, (err) => {
    console.log('Unable to connect to the database:', err);
  });

export const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    age: {
        type: Sequelize.INTEGER
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

export function createUser(name, age, username, password, email, cb) {
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      if (cb) cb(err);
    }
    // Store hash in your password DB.
    User.create({
      name,
      age,
      username,
      password: hash,
      email
    });

    if (cb) cb(null);
  });
}

// force: true will drop the table if it already exists
User.sync({ force: true }).then(() => {
  console.log('User Created Successfully');
  // Table created
  createUser('Ibrahim Zahoor', 24, 'Ibi@Zahoor', 'QBatch123', 'ibrahim.zahoor@gmail.com');
});

// force: true will drop the table if it already exists
User.sync({ force: true }).then(() => {
  User.findAll().then((users) => {
    console.log(users);
  });
});

sequelize.sync().then(() => {
  createUser('Syed M Bilal', 23, 'ShahG', 'QBatch123', 'bilal.shah@gmail.com');
}).catch((e) => {
  console.log('ERROR SYNCING WITH DB', e);
});
