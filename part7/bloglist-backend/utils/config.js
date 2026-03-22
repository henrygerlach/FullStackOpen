require("dotenv").config();

const NODE_ENV = process.env.NODE_ENV;

const mongodb_uri =
  NODE_ENV === "test" ? process.env.test_mongodb_uri : process.env.mongodb_uri;

const salt_rounds = 10;
const jwt_secret = process.env.jwt_secret;

module.exports = { mongodb_uri, NODE_ENV, jwt_secret, salt_rounds };
