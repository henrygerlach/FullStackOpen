const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const Blog = require("./utils/models");
const blogsRouter = require("./controllers/blogs");

const app = express();

mongoose.connect(config.mongodb_uri, { family: 4 });

app.use(express.json());

app.use("/api/blogs", blogsRouter);

module.exports = app;
