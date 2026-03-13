require("dotenv").config();

const NODE_ENV = process.env.NODE_ENV;
const mongodb_uri =
  NODE_ENV === "test" ? process.env.test_mongodb_uri : process.env.mongodb_uri;

module.exports = { mongodb_uri, NODE_ENV };
