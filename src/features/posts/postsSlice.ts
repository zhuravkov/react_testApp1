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
    totalPostsCount : number
    pageSize : number
    searchParam : string
}


const initialState:PostsState= {
  posts : [],
  totalPostsCount : 0,
  pageSize : 10,
  searchParam: ''  
};


export const postsSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<PostType[]>) => {
      state.posts = action.payload;
      state.totalPostsCount = state.posts.length
    },
    searching: (state,action: PayloadAction<string>) => {
        state.searchParam = action.payload
    }

  }
});

export const { setPosts, searching } = postsSlice.actions;


export const selectPosts = (state: RootState) => {
    if (state.postsReducer.searchParam.length > 0) {
        let postsWithSearch = state.postsReducer.posts.filter(p =>
            p.body.includes(state.postsReducer.searchParam)
            || p.title.includes(state.postsReducer.searchParam)
            || String(p.id).includes(state.postsReducer.searchParam) )
        return postsWithSearch
    }
    else return state.postsReducer.posts
}



export const selectTotalPostsCount = (state: RootState) => state.postsReducer.totalPostsCount;


// async get posts and dispatch them to state
export const getPostsThunk =
    ():AppThunk  => async (dispatch, getState) => {
        let payload = await postsAPI.getPosts();
        dispatch(setPosts(payload))

    }

export default postsSlice.reducer;
