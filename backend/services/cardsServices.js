const Cards = require("../validation/mongoSchemas/cardsSchema");
const Users = require("../validation/mongoSchemas/usersSchema");
const { throwError } = require("../utils/functionHandlers");

const getAllCards = async () => {
  return await Cards.find({});
};

const createCard = async (cardData) => {
  const newCard = new Cards(cardData);
  await newCard.save();
  const responseObject = {
    title: newCard.title,
    subtitle: newCard.subtitle,
    description: newCard.description,
    phone: newCard.phone,
    email: newCard.email,
    web: newCard.web,
    image: {
      url: newCard.image.url,
      alt: newCard.image.alt,
    },
    address: {
      country: newCard.address.country,
      state: newCard.address.state,
      city: newCard.address.city,
      street: newCard.address.street,
      houseNumber: newCard.address.houseNumber,
      zip: newCard.address.zip,
    }
  };
  return responseObject;
};

const getCardById = async (id) => {
  const card = await Cards.findById(id);
  if (!card) {
    throwError(404, "Card not found");
  }
  return card;
};

const getUserCards = async (userId) => {
  const user = await Users.findById(userId);
  if (!user.isBusiness) {
    throwError(403, "Access denied. Unauthorized user.");
  }

  const userCards = await Cards.find({ user_id: userId });
  if (userCards.length === 0) {
    throwError(404, "User has no cards");
  }

  return userCards;
};

const getLikedCards = async (userId) => {
  const likedCards = await Cards.find({ likes: { $in: userId } });
  if (likedCards.length === 0) {
    throwError(404, "User has no liked cards");
  }
  return likedCards;
};

const editCardById = async (cardId, updateData) => {
  const updatedCard = await Cards.findByIdAndUpdate(cardId, updateData, {
    new: true,
  });
  if (!updatedCard) {
    throwError(404, "Card not found");
  }

  return updatedCard;
};

const deleteCardById = async (cardId) => {
  const deletedCard = await Cards.findByIdAndDelete(cardId);
  if (!deletedCard) {
    throwError(404, "Card not found");
  }
  return deletedCard;
};

const toggleLike = async (cardId, userId) => {
  const card = await Cards.findById(cardId);

  if (!card) {
    throwError(400, "Card not found.");
  }

  if (card.likes.includes(userId)) {
    const idIndex = card.likes.indexOf(userId);
    card.likes.splice(idIndex, 1);
  } else {
    card.likes.push(userId);
  }
  return await card.save();
};

const changeBizNumber = async (cardId, newNumber) => {
  const allCards = await Cards.find({});
  for (const card of allCards) {
    if (card.bizNumber === Number(newNumber)) {
      throwError(400, "Business number already in use.");
    }
  }

  const updatedCard = await Cards.findByIdAndUpdate(
    cardId,
    { bizNumber: newNumber },
    { new: true },
  );
  return updatedCard;
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
  changeBizNumber,
};
