const Blog = require("../utils/models");
const blogsRouter = require("express").Router();

blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post("/", (request, response) => {
  const blog = new Blog(request.body);

  if (!blog.title || !blog.url) {
    return response.status(400).end();
  }

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;

  const blog = await Blog.findByIdAndDelete(id);

  if (blog) {
    response.status(204).end();
  } else {
    response.status(404).end();
  }
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
