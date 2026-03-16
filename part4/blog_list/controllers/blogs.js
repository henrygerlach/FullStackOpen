const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const Blog = require("../utils/models/blog");
const User = require("../utils/models/user");
const getUser = require("../utils/middleware").getUser;

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    _id: 1,
  });
  response.json(blogs);
});

blogsRouter.post("/", getUser, async (request, response) => {
  const blogJSON = request.body;
  const user = request.user;

  blogJSON.user = user.id;
  const blog = new Blog(blogJSON);

  if (!blog.title || !blog.url) {
    return response.status(400).end();
  }

  user.blogs.push(blog.id);
  await user.save();

  await blog.save();
  response.status(201).json(blogJSON);
});

blogsRouter.delete("/:id", getUser, async (request, response) => {
  const id = request.params.id;
  const user = request.user;

  const blog = await Blog.findOne({ _id: id });
  if (!blog) {
    return response.status(404).end();
  }

  if (user.id.toString() !== blog.user.toString()) {
    return response
      .status(401)
      .json({ error: "Not authorized to delete this blog" });
  }

  await Blog.findByIdAndDelete({ _id: id });

  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const newBlog = request.body;

  const oldBlog = await Blog.findOne({ _id: id });

  if (oldBlog) {
    oldBlog.likes = newBlog.likes;
    await oldBlog.save();
    response.json(oldBlog);
  } else {
    response.status(404).end();
  }
});

module.exports = blogsRouter;
