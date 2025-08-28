const express = require("express");
const cors = require("cors");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const { handleError } = require("./utils/errorHandler");
const { connectToDB } = require("./database/dbService");
const dotenv = require("dotenv");
const router = require("./controllers/main");
const config = require("config");
const morgan = require("morgan");
const { seedCards, seedUsers } = require("./seeding/seedingDataService");
const dummyUsers = require("./seeding/seedingData/userSeedingData");
const dummyCards = require("./seeding/seedingData/cardSeedingData");

dotenv.config();
const app = express();

// global middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs.txt"),
  { flags: "a" }, // 'a' means append - add new logs without erasing old ones
);

app.use(morgan("combined", { stream: accessLogStream }));

app.use(express.json());

app.use(express.static("public"));

app.use(router);

// error handler
app.use((error, _req, res, _next) => {
  handleError(res, error.status || 500, error.message);
});

// listen
const PORT = config.get("PORT") || 3000;
app.listen(PORT, async () => {
  console.log(chalk.green.bold(`server running on port ${PORT}`));
  await connectToDB();
  await seedUsers(dummyUsers);
  await seedCards(dummyCards);
});
