const express = require('express');
const router = express.Router();
const Campaign = require('../models/campaigns.model');

// GET all campaigns
router.get('/', (req, res) => {
  Campaign.findAll()
    .then(campaigns => res.json(campaigns))
    .catch(err => res.status(400).json(err));
});

// GET a campaign by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  Campaign.findByPk(id)
    .then(campaign => res.json(campaign))
    .catch(err => res.status(400).json(err));
});

// POST create a new campaign
router.post('/', (req, res) => {
  const { title, description, startDate, endDate } = req.body;

  Campaign.create({ title, description, startDate, endDate })
    .then(newCampaign => res.json(newCampaign))
    .catch(err => res.status(400).json(err));
});

// PUT update a campaign by ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const campaign = req.body;

  Campaign.update(campaign, { where: { id } })
    .then(() => Campaign.findByPk(id))
    .then(updatedCampaign => res.json(updatedCampaign))
    .catch(err => res.status(400).json(err));
});

// DELETE a campaign by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Campaign.destroy({ where: { id } })
    .then(() => res.json({ message: "Campaign deleted" }))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
