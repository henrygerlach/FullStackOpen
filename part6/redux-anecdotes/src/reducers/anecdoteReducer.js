import { createSlice } from "@reduxjs/toolkit";

import anecdotesService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    voteAnecdote(state, action) {
      const anecdote = action.payload;
      return [...state.filter((a) => a.id !== anecdote.id), anecdote];
    },
  },
});

const { setAnecdotes, createAnecdote, voteAnecdote } = anecdoteSlice.actions;

export const initalizeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdotesService.createNew(content);
    dispatch(createAnecdote(anecdote));
  };
};

export const voteForAnecdote = (id) => {
  return async (dispatch) => {
    const anecdote = await anecdotesService.vote(id);
    dispatch(voteAnecdote(anecdote));
  };
};

export default anecdoteSlice.reducer;
