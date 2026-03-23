import { createSlice } from "@reduxjs/toolkit";

import blogService from "../services/blogs";

const initialState = [];

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs(state, action) {
      action.payload.sort((a, b) => b.likes - a.likes);
      return action.payload;
    },
    addBlog(state, action) {
      const blogs = [...state, action.payload];
      blogs.sort((a, b) => b.likes - a.likes);
      return blogs;
    },
    saveBlog(state, action) {
      const blogs = [
        ...state.filter((b) => b.id !== action.payload.id),
        action.payload,
      ];
      blogs.sort((a, b) => b.likes - a.likes);
      return blogs;
    },
    deleteBlog(state, action) {
      return state.filter((b) => b.id !== action.payload);
    },
    addCommentBlog(state, action) {
      const oldBlog = state.find((blog) => blog.id === action.payload.id);
      const newBlog = {
        ...oldBlog,
        comments: oldBlog.comments.concat(action.payload.comment),
      };
      const blogs = [
        ...state.filter((b) => b.id !== action.payload.id),
        newBlog,
      ];
      blogs.sort((a, b) => b.likes - a.likes);
      return blogs;
    },
  },
});

const { setBlogs, deleteBlog, saveBlog, addBlog, addCommentBlog } =
  blogsSlice.actions;

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const savedBlog = await blogService.create(blog);
    dispatch(addBlog(savedBlog));
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService._delete(id);
    dispatch(deleteBlog(id));
  };
};

export const updateBlog = (blog) => {
  return async (dispatch) => {
    await blogService.update(blog);
    dispatch(saveBlog(blog));
  };
};

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    await blogService.comment(id, comment);
    dispatch(addCommentBlog({ id: id, comment: comment }));
  };
};

export default blogsSlice.reducer;
