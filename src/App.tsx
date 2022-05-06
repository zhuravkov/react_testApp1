import React from 'react';
import logo from './logo.svg';

import  './App.css';
import { Search } from './features/search/Search';
import { Posts } from './features/posts/Posts';
import { getPostsThunk, selectPosts } from './features/posts/postsSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';


function App() {
    return (
        <div className="App">
            <Posts />
        </div>

    );
}

export default App;
