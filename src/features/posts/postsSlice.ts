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
    pageSize: number
    currentPage: number
    searchParam: string
    isLoading: boolean
    error:string
}


const initialState: PostsState = {
    posts: [],
    pageSize: 10,
    currentPage: 1,
    searchParam: '',
    isLoading: false,
    error: ''
};


export const postsSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {

        postsFetching: (state) =>{
            state.isLoading = true
        },

        setPosts: (state, action: PayloadAction<PostType[]>) => {
            state.isLoading = false
            state.error = ''
            state.posts = action.payload
        },

        postsFetchingError: (state, action:PayloadAction<string>) =>{
            state.isLoading = false
            state.error = action.payload
        },

        searching: (state, action: PayloadAction<string>) => {
            state.searchParam = action.payload
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },

        sortPosts:(state,action: PayloadAction<string>) => {
            state.posts.sort(SortArray(action.payload))
        }
    }
});

// sorting help func
const SortArray = (param:string) => (x:any, y:any)=>{
    if (x[param] < y[param]) {return -1;}
    if (x[param] > y[param]) {return 1;}
    return 0;
}

// Export AC
export const { setPosts, searching, setCurrentPage,sortPosts } = postsSlice.actions;


// selecting posts from origins 
export const selectPosts = (state: RootState) => {

    if (state.postsReducer.searchParam.length > 0) {
        let postsWithSearch = state.postsReducer.posts.filter(p =>
            p.body.includes(state.postsReducer.searchParam)
            || p.title.includes(state.postsReducer.searchParam)
            || String(p.id).includes(state.postsReducer.searchParam))
        return postsWithSearch
    }
    else return state.postsReducer.posts
}



// async get posts and dispatch them to state
export const getPostsThunk = (): AppThunk => async (dispatch) => {
   try {
       dispatch(postsSlice.actions.postsFetching())
       let payload = await postsAPI.getPosts();
        dispatch(setPosts(payload));
   }

   catch (e:any) {
       dispatch(postsSlice.actions.postsFetchingError(e.message))
   }
   
   
    
}


export default postsSlice.reducer;
