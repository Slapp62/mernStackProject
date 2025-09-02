const express = require("express");
const {
  getAllCards,
  getCardById,
  getUserCards,
  getLikedCards,
  addLikeToCard,
} = require("../services/cardsServices.js");
const { createCard } = require("../services/cardsServices.js");
const { handleSuccess } = require("../utils/handleSuccess.js");
const { handleError } = require("../utils/errorHandler.js");
const {
  authenticateUser,
  businessAuth,
} = require("../middleware/authService.js");
const cardValidation = require("../middleware/cardValidation.js");
const normalizeCard = require("../utils/normalizeCard.js");
const e = require("express");

const cardRouter = express.Router();

// 1 - get all cards
cardRouter.get("/", async (_req, res) => {
  try {
    const cards = await getAllCards();
    handleSuccess(res, 200, cards);
  } catch (error) {
    handleError(res, 500, error.message);
  }
});

// 2 - get card by id
cardRouter.get("/:id", async (req, res) => {
  try {
    const cardId = req.params.id;
    const card = await getCardById(cardId);
    handleSuccess(res, 200, card);
  } catch (error) {
    handleError(res, 500, error.message);
  }
});

// 3 - get cards by user id
cardRouter.get("/user", authenticateUser, async (req, res) => {
  try {
    const userId = req.user._id;
    const userCards = await getUserCards(userId);
    handleSuccess(res, 200, userCards);
  } catch (error) {
    handleError(res, 500, error.message);
  }
});

// 4 - get liked cards by user id
cardRouter.get("/liked", authenticateUser, async (req, res) => {
  try {
    const userId = req.user._id;
    const likedCards = await getLikedCards(userId);
    handleSuccess(res, 200, likedCards);
  } catch (error) {
    handleError(res, 500, error.message);
  }
});

// 5 - create a new card
cardRouter.post(
  "/create",
  authenticateUser,
  businessAuth,
  cardValidation,
  async (req, res) => {
    try {
      const cardData = req.body;
      const normalizedCard = await normalizeCard(cardData, req.user._id);
      const newCard = await createCard(normalizedCard);
      handleSuccess(res, 201, newCard);
    } catch (error) {
      handleError(res, error.status, error.message);
    }
  },
);

// add like to card
cardRouter.post("/like/:cardId/:userId", async (req, res) => {
  try {
    const cardId = req.params.cardId;
    const userId = req.params.userId;
    const updatedCard = await addLikeToCard(cardId, userId);
    handleSuccess(res, 200, updatedCard);
  } catch (error) {
    handleError(res, 500, error.message);
  }
});

// edit card by id
cardRouter.put("/edit/:id", async (req, res) => {
  try {
    const cardId = req.params.id;
    const cardData = req.body;
    const updatedCard = await updatedCard(cardId, cardData);
    handleSuccess(res, 200, updatedCard);
  } catch (error) {
    handleError(res, 500, error.message);
  }
});

// delete card by id
cardRouter.delete("/:cardId/:userId", async (req, res) => {
  try {
    const cardId = req.params.id;
    const userId = req.params.userId;
    await deleteCard(cardId, userId);
    handleSuccess(res, 200, "Card deleted successfully");
  } catch (error) {
    handleError(res, 500, error.message);
  }
});

module.exports = cardRouter;
