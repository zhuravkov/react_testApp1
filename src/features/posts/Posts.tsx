import React, { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Search } from '../search/Search';
import { Header } from './Header/Header';
import { PostItem } from './PostItem/PostItem';
import styles from './Posts.module.css';

import { getPostsThunk,selectPosts, selectTotalPostsCount } from './postsSlice';




export const Posts = React.memo(() => {
    const posts = useAppSelector(selectPosts)
    // const totalPostsCount = useAppSelector(selectTotalPostsCount)
    const dispatch = useAppDispatch()


    useEffect(() => {
        console.log("RENDER THUNK")
        dispatch(getPostsThunk())
    },[dispatch])


    return (
        <div>
        <Search />
        <table>
            <thead>
                <Header />
            </thead>
            <tbody>
            {posts.map(p => <PostItem key={p.id}
                                        id = {p.id}
                                        title = {p.title}
                                        body = {p.body}
                                        userId = {p.userId} />
            )}
        </tbody>
        </table>
    </div>
    )
})