const bcrypt = require("bcrypt");
const { test, after, describe, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../app");
const config = require("../../utils/config");
const User = require("../../utils/models/user");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const user = new User({
    username: "Harry Hirsch",
    name: "Harry",
    passwordHash: await bcrypt.hash("123", config.salt_rounds),
  });

  await user.save();
});

describe("post user", async () => {
  test("creates user correctly", async () => {
    const user = {
      username: "Harry Reh",
      name: "Harry",
      password: "123",
    };

    const userCountBefore = await User.countDocuments({});

    await api.post("/api/users").send(user).expect(201);

    const userCountAfter = await User.countDocuments({});
    assert.strictEqual(userCountBefore, userCountAfter - 1);

    const saved = await User.findOne({ username: user.username });
    assert.strictEqual(user.username, saved.username);
    assert.strictEqual(user.name, saved.name);
    assert.ok(!saved.blogs.length);
  });

  test("creates no user when password length is to short", async () => {
    const user = {
      username: "Harry Reh",
      name: "Harry",
      password: "12",
    };

    const response = await api.post("/api/users").send(user).expect(422);

    assert.deepStrictEqual(response.body, {
      error: "password must be atleast 3 characters long",
    });
  });

  test("creates no user when username already in use", async () => {
    const user = {
      username: "Harry Hirsch",
      name: "Harry",
      password: "123",
    };

    const response = await api.post("/api/users").send(user).expect(409);

    assert.deepStrictEqual(response.body, {
      error: "username already in use",
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
