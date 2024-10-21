const express = require('express');
const router = express.Router();
const User = require('../models/User.model');

// GET all users
router.get('/', (req, res) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(err => res.status(400).json(err));
});

// GET a user by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  User.findByPk(id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
});

// POST create a new user
router.post('/', (req, res) => {
  const { name, surname, email, password, phoneNumber, address } = req.body;

  User.create({ name, surname, email, password, phoneNumber, address })
    .then(newUser => res.json(newUser))
    .catch(err => res.status(400).json(err));
});

// PUT update a user by ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const user = req.body;

  User.update(user, { where: { id } })
    .then(() => User.findByPk(id))
    .then(updatedUser => res.json(updatedUser))
    .catch(err => res.status(400).json(err));
});

// DELETE a user by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  User.destroy({ where: { id } })
    .then(() => res.json({ message: "User deleted" }))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
