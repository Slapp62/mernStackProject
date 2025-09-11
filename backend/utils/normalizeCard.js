const Cards = require("../validation/mongoSchemas/cardsSchema");
const _ = require("lodash");

const generateRandomNumber = async () => {
  let randomNumber;
  let numberExists;

  do {
    // 1. Generate number
    randomNumber = _.random(1000000, 9999999);
    // 2. Check if taken
    numberExists = await Cards.exists({ bizNumber: randomNumber });
  } while (numberExists); // 3. If taken, repeat. If not, exit

  return randomNumber;
};

const normalizeCard = async (cardData, userId) => {
  const {url, alt} = cardData.image;
  const normalizedImage = {
    url: url || 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YnVzaW5lc3N8ZW58MHx8MHx8fDA%3D',
    alt: alt || 'Business image',
  }
  const randomNumber = await generateRandomNumber();
  const normalizedCard = {
    ...cardData,
    bizNumber: randomNumber,
    user_id: userId,
    image: normalizedImage
  };

  return normalizedCard;
};

module.exports = normalizeCard;
