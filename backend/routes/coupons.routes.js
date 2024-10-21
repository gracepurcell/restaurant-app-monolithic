const express = require('express');
const router = express.Router();
const Coupon = require('../models/coupons.model');

// GET all coupons
router.get('/', (req, res) => {
  Coupon.findAll()
    .then(coupons => res.json(coupons))
    .catch(err => res.status(400).json(err));
});

// GET a coupon by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  Coupon.findByPk(id)
    .then(coupon => res.json(coupon))
    .catch(err => res.status(400).json(err));
});

// POST create a new coupon
router.post('/', (req, res) => {
  const { code, discount, validUntil } = req.body;

  Coupon.create({ code, discount, validUntil })
    .then(newCoupon => res.json(newCoupon))
    .catch(err => res.status(400).json(err));
});

// PUT update a coupon by ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const coupon = req.body;

  Coupon.update(coupon, { where: { id } })
    .then(() => Coupon.findByPk(id))
    .then(updatedCoupon => res.json(updatedCoupon))
    .catch(err => res.status(400).json(err));
});

// DELETE a coupon by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Coupon.destroy({ where: { id } })
    .then(() => res.json({ message: "Coupon deleted" }))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
