const express = require('express');
const router = express.Router();
const Order = require('../models/Order.model');

// GET all orders
router.get('/', (req, res) => {
  Order.findAll()
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json(err));
});

// GET an order by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  Order.findByPk(id)
    .then(order => res.json(order))
    .catch(err => res.status(400).json(err));
});

// POST create a new order
router.post('/', (req, res) => {
  const { status, total, userId, items } = req.body;

  Order.create({ status, total, userId, items })
    .then(newOrder => res.json(newOrder))
    .catch(err => res.status(400).json(err));
});

// PUT update an order by ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const order = req.body;

  Order.update(order, { where: { id } })
    .then(() => Order.findByPk(id))
    .then(updatedOrder => res.json(updatedOrder))
    .catch(err => res.status(400).json(err));
});

// DELETE an order by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Order.destroy({ where: { id } })
    .then(() => res.json({ message: "Order deleted" }))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
