const express = require('express');
const router = express.Router();
const Dietary = require('../models/dietary.model');

// GET all dietary items
router.get('/', (req, res) => {
  Dietary.findAll()
    .then(dietary => res.json(dietary))
    .catch(err => res.status(400).json(err));
});

// GET a dietary item by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  Dietary.findByPk(id)
    .then(dietary => res.json(dietary))
    .catch(err => res.status(400).json(err));
});

// POST create a new dietary item
router.post('/', (req, res) => {
  const { name, description } = req.body;

  Dietary.create({ name, description })
    .then(newDietary => res.json(newDietary))
    .catch(err => res.status(400).json(err));
});

// PUT update a dietary item by ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const dietary = req.body;

  Dietary.update(dietary, { where: { id } })
    .then(() => Dietary.findByPk(id))
    .then(updatedDietary => res.json(updatedDietary))
    .catch(err => res.status(400).json(err));
});

// DELETE a dietary item by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Dietary.destroy({ where: { id } })
    .then(() => res.json({ message: "Dietary item deleted" }))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
