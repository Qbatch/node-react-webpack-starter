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

// force: true will drop the table if it already exists
User.sync({force: true}).then(() => {
    console.log('User Created Successfully');
    // Table created
    return User.create({
        name: 'Ibrahim Zahoor',
        age: 24,
        username: 'Ibi@Zahoor',
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
        name: 'Syed M Bilal',
        age: 23,
        username: "Bilal@Shah",
        password: "QBatch123",
        email: "bilal.shah@gmail.com"
    });
}).catch(function(e) {
    console.log("ERROR SYNCING WITH DB", e);
});


    // .put(function(req, res) {
    //   Customer.findById(req.params.customer_id).then(function(customer) {
    //     customer.update(_.pick(req.body, ['name', 'address', 'phone'])).then(function(customer) {
    //       res.json(customer);
    //     });
    //   });
    // })
    // .delete(function(req, res) {
    //   Customer.findById(req.params.customer_id).then(function(customer) {
    //     customer.destroy().then(function(customer) {
    //       res.json(customer);
    //     });
    //   });
    // });