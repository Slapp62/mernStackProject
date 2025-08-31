const { connectLocalDB } = require("./mongoDB/connectLocally");
const { connectAtlasDB } = require("./mongoDB/connectAtlas");
const config = require("config");

const ENV = config.get("NODE_ENV");

const connectToDB = async () => {
  if (ENV === "development") {
    await connectLocalDB();
  }
  if (ENV === "production") {
    await connectAtlasDB();
  }
};

module.exports = { connectToDB };
