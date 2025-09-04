const Cards = require("../validation/mongoSchemas/cardsSchema");
const Users = require("../validation/mongoSchemas/usersSchema");

const getAllCards = async () => {
  return await Cards.find({});
};

const createCard = async (cardData) => {
  try {
    const newCard = new Cards(cardData);
    return await newCard.save();
  } catch (error) {
    const createError = new Error("Error creating card - " + error.message);
    createError.status = 400;
    throw createError;
  }
};

const getCardById = async (id) => {
  const card = await Cards.findById(id);
  if (!card) {
    const error = new Error("Card not found");
    error.status = 404;
    throw error;
  }
  return card;
};

const getUserCards = async (userId) => {
  const user = await Users.findById(userId);
  if (!user.isBusiness) {
    throw new Error("User is not a business user");
  }

  const userCards = await Cards.find({ user_id: userId });
  if (userCards.length === 0) {
    throw new Error("User has no cards");
  }

  return userCards;
};

const getLikedCards = async (userId) => {
  const likedCards = await Cards.find({ likes: { $in: userId } });
  if (likedCards.length === 0) {
    const error = new Error("No liked cards");
    error.status = 404;
    throw error;
  }
  return likedCards;
};

const editCardById = async (cardId, updateData) => {
  const updatedCard = await Cards.findByIdAndUpdate(cardId, updateData, {new: true,});
  if (!updatedCard) {
    throw new Error("Card not found");
  }
  
  return updatedCard;
};

const deleteCardById = async (cardId) => {  
  const deletedCard = await Cards.findByIdAndDelete(cardId);
  if (!deletedCard) {
    throw new Error("Card not found");
  }
  return deletedCard;
};

const toggleLike = async (cardId, userId) => {
  const card = await Cards.findById(cardId);

  if (!card) {
    const error = new Error("Card not found");
    error.status = 400;
    throw error;
  }

  if (card.likes.includes(userId)) {
    const idIndex = card.likes.indexOf(userId);
    card.likes.splice(idIndex, 1);
  } else {
    card.likes.push(userId);
  }
  return await card.save();
};

module.exports = {
  getAllCards,
  createCard,
  getCardById,
  getUserCards,
  getLikedCards,
  editCardById,
  deleteCardById,
  toggleLike,
};
