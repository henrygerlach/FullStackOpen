const { test, after, describe, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../app");
const Blog = require("../../utils/models/blog");

const api = supertest(app);

const blogs = [
  {
    id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of blogs) {
    let blogObj = new Blog(blog);
    await blogObj.save();
  }
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
  test("response has status 400, when blogs title is missing", async () => {
    const missingTitleBlog = {
      author: "Harry Hirsch",
      url: "my.blog.com",
      likes: 67,
    };

    await api
      .post("/api/blogs")
      .send(missingTitleBlog)
      .set("Content-Type", "application/json")
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
      .send(missingUrlBlog)
      .set("Content-Type", "application/json")
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
      .send(newBlog)
      .set("Content-Type", "application/json")
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
      .send(newBlog)
      .set("Content-Type", "application/json")
      .expect(201);

    const saved = await Blog.findOne({ title: newBlog.title });
    assert.strictEqual(saved.likes, 0);
  });
});

describe("delete blog", async () => {
  test("that exists", async () => {
    const id = (await Blog.find({}))[0]._id;

    const countBefore = await Blog.countDocuments({});

    await api.delete(`/api/blogs/${id}`).expect(204);

    const countAfter = await Blog.countDocuments({});
    assert.strictEqual(countBefore, countAfter + 1);

    const blog = await Blog.findById(id);
    assert.strictEqual(blog, null);
  });

  test("that does not exist", async () => {
    const countBefore = await Blog.countDocuments({});

    await api.delete(`/api/blogs/111111111111111111111111`).expect(404);

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
