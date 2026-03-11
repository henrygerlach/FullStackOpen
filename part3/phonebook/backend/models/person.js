const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.mongodb_uri, { family: 4 })
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

module.exports = mongoose.model("Person", personSchema);
