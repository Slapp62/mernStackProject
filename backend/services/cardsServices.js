const Cards = require('../validation/mongoSchemas/cardsSchema');

const getAllCards = async () => {
  return await Cards.find({});
}

const createCard = async (cardData) => {
  const newCard = new Cards(cardData);
  return await newCard.save();
}

module.exports = { getAllCards, createCard };