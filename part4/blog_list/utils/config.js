require("dotenv").config();

const mongodb_uri = process.env.mongodb_uri;

module.exports = { mongodb_uri };
