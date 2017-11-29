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
    },
    role: {
        type: Sequelize.STRING
    }
});

export const Product = sequelize.define('product', {
  id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  name: {
      type: Sequelize.STRING
  },
  color: {
      type: Sequelize.INTEGER
  },
  size: {
      type: Sequelize.STRING
  },
  description: {
      type: Sequelize.STRING
  },
  price: {
      type: Sequelize.STRING
  },
  sellerId: {
    type: Sequelize.INTEGER
  }
});

export const Order = sequelize.define('order', {
  id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  userId: {
      type: Sequelize.INTEGER
  },
  status: {
      type: Sequelize.STRING
  },
  totalPrice: {
      type: Sequelize.FLOAT
  }
});

export const OrderItems = sequelize.define('order_items', {
  orderId: {
      type: Sequelize.INTEGER
  },
  productId: {
      type: Sequelize.INTEGER
  },
  price: {
      type: Sequelize.STRING
  },
  quantity: {
      type: Sequelize.STRING
  }
});

export function createUser(name, age, username, password, email, role, cb) {
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
      email,
      role
    });

    if (cb) cb(null);
  });
}

export function createProduct(name, color, size, description, price, sellerId, cb) {
  // Store hash in your password DB.
  Product.create({
    name,
    color,
    size,
    description,
    price,
    sellerId
  });

  if (cb) cb(null);
}

// force: true will drop the table if it already exists
User.sync({ force: true }).then(() => {
  console.log('User Created Successfully');

  // createUser('ABC Seller2', 23, 'ShahG', '12345678', 'abcs2.xyz@gmail.com', 'Seller');
  // createUser('ABC Seller1', 24, 'Ibi@Zahoor', '12345678', 'abcs1.xyz@gmail.com', 'Seller');
  createUser('ABC Buyer1', 23, 'ShahG', '12345678', 'abcb1.xyz@gmail.com', 'Buyer');

  createProduct('ABC DEF', 'RED', '10', 'Dummy Description', '100', 2);
  createProduct('ABC GHI', 'GREEN', '20', 'Dummy Description', '200', 2);
  createProduct('ABC JKL', 'BLUE', '30', 'Dummy Description', '300', 2);
  createProduct('ABC MNO', 'ORANGE', '40', 'Dummy Description', '400', 2);
  createProduct('ABC PQR', 'BLACK', '50', 'Dummy Description', '500', 2);
});

// force: true will drop the table if it already exists
User.sync({ force: true }).then(() => {
  // User.findAll().then((users) => {
  //   console.log(users);
  // });
});

Product.sync({ force: true }).then(() => {
});

Order.sync({ force: true }).then(() => {
});

OrderItems.sync({ force: true }).then(() => {
});
