const { encryptPassword } = require("../utils/bcrypt");
const normalizeCard = require("../utils/normalizeCard");
const Cards = require("../validation/mongoSchemas/cardsSchema");
const Users = require("../validation/mongoSchemas/usersSchema");

const seedCards = async (cards) => {
  const admin = await Users.findOne({ isAdmin: "true" });
  for (const card of cards) {
    try {
      const storedCard = await Cards.findOne({ title: card.title });
      if (storedCard) {
        continue;
      }
      const normalizedCard = await normalizeCard(card, admin._id);
      const newCard = new Cards(normalizedCard);
      await newCard.save();
    } catch (error) {
      console.error("Error seeding card:", error);
    }
  }
};

const seedUsers = async (users) => {
  for (const user of users) {
    try {
      const existingUser = await Users.findOne({ email: user.email });
      if (existingUser) {
        continue;
      }
      const hashedPassword = await encryptPassword(user.password);
      user.password = hashedPassword;
      const newUser = new Users(user);
      await newUser.save();
    } catch (error) {
      console.error("Error seeding user:", error);
    }
  }
};

module.exports = {
  seedCards,
  seedUsers,
};
