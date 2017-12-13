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
    type: Sequelize.STRING,
    unique: true
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
  bcrypt.hash(password, saltRounds, (passwordErr, hash) => {
    if (passwordErr) {
      if (cb) cb(passwordErr);
    }
    // Store hash in your password DB.
    User.create({
      name,
      age,
      username,
      password: hash,
      email,
      role
    }).then(() => {
      if (cb) cb(null);
    }).catch((insertionErr) => {
      console.log(insertionErr);
      if (cb) cb(insertionErr);
    });
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

  createProduct('ABC', 'ORANGE', '40', 'Dummy Description', '400', 2);
  createProduct('DEF', 'RED', '10', 'Dummy Description', '100', 2);
  createProduct('GHI', 'GREEN', '20', 'Dummy Description', '200', 2);
  createProduct('JKL', 'BLUE', '30', 'Dummy Description', '300', 2);
  createProduct('MNO', 'ORANGE', '40', 'Dummy Description', '400', 2);
  createProduct('PQR', 'BLACK', '50', 'Dummy Description', '500', 2);
  createProduct('STU', 'RED', '10', 'Dummy Description', '100', 2);
  createProduct('VWX', 'GREEN', '20', 'Dummy Description', '200', 2);
  createProduct('YZ', 'BLUE', '30', 'Dummy Description', '300', 2);
  createProduct('ABC2', 'ORANGE', '40', 'Dummy Description', '400', 2);
  createProduct('DEF2', 'RED', '10', 'Dummy Description', '100', 2);
  createProduct('GHI2', 'GREEN', '20', 'Dummy Description', '200', 2);
  createProduct('JKL2', 'BLUE', '30', 'Dummy Description', '300', 2);
  createProduct('MNO2', 'ORANGE', '40', 'Dummy Description', '400', 2);
  createProduct('PQR2', 'BLACK', '50', 'Dummy Description', '500', 2);
  createProduct('STU2', 'RED', '10', 'Dummy Description', '100', 2);
  createProduct('VWX2', 'GREEN', '20', 'Dummy Description', '200', 2);
  createProduct('YZ2', 'BLUE', '30', 'Dummy Description', '300', 2);
});

// force: true will drop the table if it already exists
User.sync({ force: true }).then(() => {
});

Product.sync({ force: true }).then(() => {
});

Order.sync({ force: true }).then(() => {
});

OrderItems.sync({ force: true }).then(() => {
});
