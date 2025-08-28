const { connectLocalDB } = require("./mongoDB/connectLocally");
const { connectAtlasDB } = require("./mongoDB/connectAtlas"); // future use

const ENV = "dev";

const connectToDB = async () => {
  if (ENV === "dev") {
    await connectLocalDB();
  }
  if (ENV === "prod") {
    await connectAtlasDB();
  }
};

module.exports = { connectToDB };
