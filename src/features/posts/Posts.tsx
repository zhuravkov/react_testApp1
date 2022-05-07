import React, { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {Paginator} from '../paginator/paginator';

import { Search } from '../search/Search';
import { Header } from './Header/Header';
import { PostItem } from './PostItem/PostItem';
import styles from './Posts.module.css';

import { getPostsThunk,selectPosts, selectCurrentPage, selectPageSize } from './postsSlice';




export const Posts = React.memo(() => {
    const posts = useAppSelector(selectPosts)
    const currentPage = useAppSelector(selectCurrentPage)
    const pageSize = useAppSelector(selectPageSize)
    
    const dispatch = useAppDispatch()

    let totalPostsCount = posts.length


    let sliceStart = Math.ceil((currentPage-1)*100/pageSize)
    let sliceEnd = currentPage*pageSize


    let postsOnPage = posts.slice(sliceStart,sliceEnd)



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
            {postsOnPage.map(p => <PostItem key={p.id}
                                        id = {p.id}
                                        title = {p.title}
                                        body = {p.body}
                                        userId = {p.userId} />
            )}
        </tbody>
        </table>
        <Paginator totalItemsCount={totalPostsCount}
                    currentPage = {currentPage}
                    pageSize = {pageSize} />
    </div>
    )
})