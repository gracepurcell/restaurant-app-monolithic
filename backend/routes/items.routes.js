const express = require('express');
const router = express.Router();
const Item = require('../models/Item.model'); // Ensure the correct model is imported
const upload = require('../config/cloudinary.config'); // Import the configured upload middleware


// GET all items
router.get('/', (req, res) => {
    Item.findAll()
        .then(items => res.json(items))
        .catch(err => res.status(400).json(err));
});

// GET an item by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;

    Item.findByPk(id)
        .then(item => res.json(item))
        .catch(err => res.status(400).json(err));
});

// POST create a new item with image upload to Cloudinary
router.post('/', upload.single('imagem'), (req, res) => {
    const { name, price, description, availability, dietaryInformation } = req.body;
    const fileUrl = req.file.path; // This is the URL of the uploaded image from Cloudinary
  
    Item.create({
      name,
      price,
      description,
      availability,
      dietaryInformation,
      image: fileUrl, // Save the Cloudinary image URL in the database
    })
      .then(newItem => res.json(newItem))
      .catch(err => res.status(400).json(err));
  });

// PUT update an item by ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const item = req.body;

    Item.update(item, { where: { id } })
        .then(() => Item.findByPk(id))
        .then(updatedItem => res.json(updatedItem))
        .catch(err => res.status(400).json(err));
});

// DELETE an item by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Item.destroy({ where: { id } })
        .then(() => res.json({ message: "Item deleted" }))
        .catch(err => res.status(400).json(err));
});

module.exports = router;
