const { test, after, describe, beforeEach } = require("node:test");
const assert = require("node:assert");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../app");
const Blog = require("../../utils/models/blog");
const config = require("../../utils/config");
const User = require("../../utils/models/user");

const api = supertest(app);

const blogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
];

let token = null;

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const user = new User({
    username: "Harry Elch",
    name: "Harry",
    passwordHash: await bcrypt.hash("123", config.salt_rounds),
  });
  await user.save();

  for (let blog of blogs) {
    blog.user = user.id;
    let blogObj = new Blog(blog);
    await blogObj.save();
  }

  const loginResponse = await api
    .post("/api/login")
    .set("Content-Type", "application/json")
    .send({
      username: user.username,
      password: "123",
    });

  token = `Bearer ${loginResponse.body.token}`;
});

describe("get blogs", async () => {
  test("returns json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("unique identifier is named id", async () => {
    const response = await api.get("/api/blogs").expect(200);

    for (const blog of response.body) {
      assert.ok("id" in blog, "blog should have an id field");
      assert.ok(!("_id" in blog), "blog should not have an _id field");
    }
  });
});

describe("post blog", async () => {
  test("response has status 401, on invalid access token", async () => {
    const blog = {
      author: "Harry Hirsch",
      title: "My Blog",
      url: "my.blog.com",
      likes: 67,
    };

    await api
      .post("/api/blogs")
      .set("Content-Type", "application/json")
      .set("Authorization", "Bearer invalid.token.value")
      .send(blog)
      .expect(401);
  });

  test("response has status 400, when blogs title is missing", async () => {
    const missingTitleBlog = {
      author: "Harry Hirsch",
      url: "my.blog.com",
      likes: 67,
    };

    await api
      .post("/api/blogs")
      .set("Content-Type", "application/json")
      .set("Authorization", token)
      .send(missingTitleBlog)
      .expect(400);
  });

  test("response has status 400, when blogs url is missing", async () => {
    const missingUrlBlog = {
      title: "My Blog",
      author: "Harry Hirsch",
      likes: 67,
    };

    await api
      .post("/api/blogs")
      .set("Content-Type", "application/json")
      .set("Authorization", token)
      .send(missingUrlBlog)
      .expect(400);
  });

  test("posts blog", async () => {
    const newBlog = {
      title: "My Blog",
      author: "Harry Hirsch",
      url: "my.blog.com",
      likes: 67,
    };

    const countBefore = await Blog.countDocuments({});

    await api
      .post("/api/blogs")
      .set("Content-Type", "application/json")
      .set("Authorization", token)
      .send(newBlog)
      .expect(201);

    const countAfter = await Blog.countDocuments({});
    assert.strictEqual(countAfter, countBefore + 1);

    const saved = await Blog.findOne({ title: newBlog.title });
    assert.strictEqual(saved.title, newBlog.title);
    assert.strictEqual(saved.author, newBlog.author);
    assert.strictEqual(saved.url, newBlog.url);
    assert.strictEqual(saved.likes, newBlog.likes);
  });

  test("likes defaults to 0", async () => {
    const newBlog = {
      title: "My Blog",
      author: "Harry Hirsch",
      url: "my.blog.com",
    };

    await api
      .post("/api/blogs")
      .set("Content-Type", "application/json")
      .set("Authorization", token)
      .send(newBlog)
      .expect(201);

    const saved = await Blog.findOne({ title: newBlog.title });
    assert.strictEqual(saved.likes, 0);
  });
});

describe("delete blog", async () => {
  test("that exists", async () => {
    const id = (await Blog.find({}))[0]._id;

    const countBefore = await Blog.countDocuments({});

    await api
      .delete(`/api/blogs/${id}`)
      .set("Authorization", token)
      .expect(204);

    const countAfter = await Blog.countDocuments({});
    assert.strictEqual(countBefore, countAfter + 1);

    const blog = await Blog.findById(id);
    assert.strictEqual(blog, null);
  });

  test("that does not exist", async () => {
    const countBefore = await Blog.countDocuments({});

    await api
      .delete(`/api/blogs/111111111111111111111111`)
      .set("Authorization", token)
      .expect(404);

    const countAfter = await Blog.countDocuments({});
    assert.strictEqual(countBefore, countAfter);
  });
});

describe("update blog", async () => {
  test("that exists", async () => {
    const oldBlog = (await Blog.find({}))[0];
    const updatedBlog = {
      ...oldBlog.toJSON(),
      likes: oldBlog.likes + 1,
    };

    const response = await api
      .put(`/api/blogs/${oldBlog._id}`)
      .send(updatedBlog)
      .set("Content-Type", "application/json")
      .expect(200);

    assert.strictEqual(response.body.likes, updatedBlog.likes);

    const savedBlog = await Blog.findById(oldBlog._id);
    assert.strictEqual(savedBlog.likes, updatedBlog.likes);
  });

  test("that does not exist", async () => {
    await api.put(`/api/blogs/111111111111111111111111`).expect(404);
  });
});

after(async () => {
  await mongoose.connection.close();
});
