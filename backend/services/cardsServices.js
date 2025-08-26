const Cards = require('../validation/mongoSchemas/cardsSchema');
const Users = require('../validation/mongoSchemas/usersSchema');

const getAllCards = async () => {
  return await Cards.find({});
}

const createCard = async (cardData) => {
  const newCard = new Cards(cardData);
  return await newCard.save();
}

const getCardById = async (id) => {
  const card = await Cards.findById(id);
  if (!card) {
    throw new Error('Card not found');
  }
  return card;
}

const getUserCards = async (userId) => {
  const user = await Users.findById(userId);
  if (!user.isBusiness){
    throw new Error('User is not a business user');
  }

  const userCards = await Cards.find({ user_id: userId });
  if (userCards.length === 0) {
    throw new Error('User has no cards');
  }
  
  return userCards;
}

const getLikedCards = async (userId) => {
  const likedCards = await Cards.find({ likes: { $in: userId } });
  return likedCards;
}

module.exports = { 
  getAllCards, 
  createCard,
  getCardById,
  getUserCards,
  getLikedCards
};