import express from 'express';

import { User, Product, createProduct, Order, OrderItems } from '../../server/models/database';

const router = new express.Router();

const keySecret = 'sk_test_bnofY7fzyMA4eE45sJjRzALV';

const stripe = require('stripe')(keySecret);

router.get('/users/:userId', (req, res) => {
  User.findById(req.params.userId).then((user) => {
    res.json(user);
  });
});

router.get('/products', (req, res) => {
  Product.findAll().then((products) => {
    res.json(products);
  });
});

router.get('/products/:id', (req, res) => {
  Product.findAll({
    where: {
      sellerId: req.params.id
    }
  }).then((products) => {
    res.json(products);
  });
});

router.post('/add_product', (req, res) => {
  return createProduct(
    req.body.name.trim(), req.body.color.trim(), req.body.size.trim(),
    req.body.description.trim(), req.body.price.trim(), req.body.sellerID.trim(),
    (err) => {
      if (err) { return res(err); }

      return res.json(null);
    }
  );
});

router.post('/edit_product', (req, res) => {
  return Product.update({
    name: req.body.name.trim(),
    color: req.body.color.trim(),
    size: req.body.size.trim(),
    description: req.body.description.trim(),
    price: req.body.price.trim()
  }, {
    where: {
      id: req.body.id.trim()
    }
  }).then((rowEdited) => {
    if (rowEdited === 1) {
      console.log('Edited successfully Row with id = ', req.body.id.trim());
    }

    return res.json(null);
  }).catch(err => res(err));
});

router.post('/del_product', (req, res) => {
  return Product.destroy({
    where: {
      id: req.body.id.trim()
    }
  }).then((rowDeleted) => {
    if (rowDeleted === 1) {
      console.log('Deleted successfully Row with id = ', req.body.id.trim());
    }

    return res.json(null);
  }).catch(err => res(err));
});

router.get('/cart/product/:id', (req, res) => {
  Product.findAll({
    where: {
      id: req.params.id
    }
  }).then((products) => {
    res.json(products);
  });
});

router.post('/cart/charge', (req, res) => {
  console.log('Create Charge: ', req.body);
  stripe.charges.create({
    amount: req.body.amount,
    description: 'Sample Charge',
    currency: 'usd',
    source: req.body.id
  }).then(() => {
    console.log('\n\n Charge Created \n\n');
    res.json(null);
  });
});

router.post('/cart/checkout', (req, res) => {
  console.log('\n\n CheckOut : ', req.body);
  const data = JSON.parse(req.body.data);
  console.log('\n\n Data : ', data);

  Order.create({
    userId: parseInt(req.body.userId, 10),
    status: 'Pending',
    totalPrice: parseInt(req.body.totalPrice, 10)
  }).then((order) => {
    data.map((item) => {
      OrderItems.create({
        orderId: order.id,
        productId: item.id,
        price: item.price,
        quantity: item.quantity
      }).catch(err => res(err));
    });

    return res.json(null);
  }).catch(err => res(err));
});

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message."
  });
});

module.exports = router;
