const express = require('express');
const { getAllCards, getCardById, getUserCards } = require('../services/cardsServices.js');
const { createCard } = require('../services/cardsServices.js');
const { handleSuccess } = require('../utils/handleSuccess.js');
const { handleError } = require('../utils/errorHandler.js');

const cardRouter = express.Router();

cardRouter.get('/', async (_req, res) => {
  try {
    const cards = await getAllCards();
    handleSuccess(res, 200, cards);
  } catch (error) {
    handleError(res, 500, error.message);
  }
});

cardRouter.post('/create', async (req, res) => {
  try {
    const cardData = req.body;
    const newCard = await createCard(cardData);
    handleSuccess(res, 201, newCard);
  } catch (error) {
    handleError(res, 500, error.message);
  }
});

cardRouter.get('/:id', async (req, res) => {
  try {
    const cardId = req.params.id;
    const card = await getCardById(cardId);
    handleSuccess(res, 200, card);
  } catch (error) {
    handleError(res, 500, error.message);
  }
});

cardRouter.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const userCards = await getUserCards(userId);
    handleSuccess(res, 200, userCards);
  } catch (error) {
    handleError(res, 500, error.message);
  }
});

module.exports = cardRouter;