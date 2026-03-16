const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const config = require("../utils/config");
const User = require("../utils/models/user");

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (password.length < 3) {
    return response
      .status(422)
      .send({ error: "password must be atleast 3 characters long" });
  }

  const oldUser = await User.findOne({ username: username });
  if (oldUser) {
    return response.status(409).send({ error: "username already in use" });
  }

  const passwordHash = await bcrypt.hash(password, config.salt_rounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
    _id: 1,
  });
  response.json(users);
});

module.exports = usersRouter;
