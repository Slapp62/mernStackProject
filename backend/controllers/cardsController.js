const express = require('express');
const { getAllCards } = require('../services/cardsServices.js');
const { createCard } = require('../services/cardsServices.js');

const cardRouter = express.Router();

cardRouter.get('/', async (_req, res) => {
  try {
    const cards = await getAllCards();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

cardRouter.post('/create', async (req, res) => {
  try {
    const cardData = req.body;
    const newCard = await createCard(cardData);
    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = cardRouter;