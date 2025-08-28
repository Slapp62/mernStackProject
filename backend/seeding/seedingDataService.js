const { encryptPassword } = require("../utils/bcrypt");
const Card = require("../validation/mongoSchemas/cardsSchema");
const User = require("../validation/mongoSchemas/usersSchema");

const seedCards = async (cards) => {
  for (const card of cards) {
    try {
      const storedCard = await Card.findOne({ title: card.title });
      if (storedCard) {
        continue;
      }
      const newCard = new Card(card);
      await newCard.save();
    } catch (error) {
      console.error("Error seeding card:", error);
    }
  }
};

const seedUsers = async (users) => {
  for (const user of users) {
    try {
      const existingUser = await User.findOne({ email: user.email });
      if (existingUser) {
        continue;
      }
      const hashedPassword = await encryptPassword(user.password);
      user.password = hashedPassword;
      const newUser = new User(user);
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
