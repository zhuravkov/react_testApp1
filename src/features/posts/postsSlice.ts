import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { postsAPI } from './../../api/api';


export type PostType = {
    userId: number
    id: number
    title: string
    body: string
}


type PostsState = {
    posts: PostType[]
}


const initialState:PostsState= {
  posts : [] };


export const postsSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<PostType[]>) => {
      state.posts = action.payload;
    }
  }
});

export const { setPosts } = postsSlice.actions;


export const selectPosts = (state: RootState) => state.postsReducer.posts;


// async get posts and dispatch them to state
export const getPostsThunk =
    ():AppThunk  => async (dispatch, getState) => {
        let payload = await postsAPI.getPosts();
        dispatch(setPosts(payload))

    }

export default postsSlice.reducer;
