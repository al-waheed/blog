import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const categories = [
  "Technology",
  "Travel",
  "Sports",
  "AI",
  "Food",
  "Lifestyle",
  "Health",
  "Business",
  "Entertainment",
];

const initialState = {
  posts: [],
  categories,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.unshift({
        id: uuidv4(),
        ...action.payload,
        createdAt: new Date().toISOString(),
        comments: [],
      });
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    updatePost: (state, action) => {
      const { id, ...updates } = action.payload;
      const post = state.posts.find((post) => post.id === id);
      if (post) {
        Object.assign(post, updates);
      }
    },
    addComment: (state, action) => {
      const { postId, name, text } = action.payload;
      const post = state.posts.find((post) => post.id === postId);

      if (post) {
        post.comments = post.comments || [];
        post.comments.unshift({ name, text });
      }
    },
  },
});

export const { addPost, deletePost, updatePost, addComment } =
  blogSlice.actions;
export default blogSlice.reducer;
