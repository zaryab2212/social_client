import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogOut: (state, action) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      state.user.friends = action.payload;
    },
    setPosts: (state, action) => {
      if (action.payload.updatePost) {
        const ind = state.posts.post.findIndex(
          (item) => item._id === action.payload.updatePost._id
        );
        state.posts.post.splice(ind, 1, action.payload.updatePost);
      } else if (action.payload.postData) {
        const ind = state.posts.post.findIndex(
          (item) => item._id === action.payload.postData._id
        );
        state.posts.post.splice(ind, 1, action.payload.postData);
      } else if (action.payload.posttt) {
        state.posts = {
          post: [...state.posts.post, action.payload.posttt],
        };
      } else {
        state.posts = action.payload.posts;
      }
    },
    setPost: (state, action) => {
      const updatedPost = state.posts.post.map((post) => {
        if (post._id === action.payload.post_id) {
          return action.payload.post;
        }
        return post;
      });
      state.posts = updatedPost;
    },
  },
});

export const { setMode, setLogOut, setLogin, setFriends, setPosts, setPost } =
  authSlice.actions;

export default authSlice.reducer;
