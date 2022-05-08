import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {Paginator} from '../paginator/paginator';
import { Search } from '../search/Search';
import { Header } from './Header/Header';
import { PostItem } from './PostItem/PostItem';
import { getPostsThunk,selectPosts } from './postsSlice';
import styles from './Posts.module.css';



export const Posts = React.memo(() => {
    let dispatch = useAppDispatch()

    let posts = useAppSelector(selectPosts)

    const {currentPage, pageSize, isLoading, error} = useAppSelector(state => state.postsReducer)

    
    let totalPostsCount = posts.length

    // Do slices from origin posts
    let sliceStart = Math.ceil((currentPage - 1) * 100 / pageSize)
    let sliceEnd = currentPage * pageSize
    let postsOnPage = posts.slice(sliceStart, sliceEnd)

    // dispatch ThunkCreator getting posts async
    useEffect(() => {
        dispatch(getPostsThunk())
    }, [dispatch])

    return (
        <div>

            <Search />
            <table>
                <thead>
                    <Header />
                </thead>
                <tbody>
                    {postsOnPage.map(p => <PostItem key={p.id}
                        id={p.id}
                        title={p.title}
                        body={p.body}
                        userId={p.userId} />
                    )}
                </tbody>
            </table>    

            {isLoading && <h1>Идёт загрузка...</h1> }
            {error && <h1>{error}</h1> }

            <Paginator totalItemsCount={totalPostsCount}
                currentPage={currentPage}
                pageSize={pageSize} />
        </div>
    )
})