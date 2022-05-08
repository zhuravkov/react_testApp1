import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {Paginator} from '../paginator/paginator';
import { Search } from '../search/Search';
import { Header } from './Header/Header';
import { PostItem } from './PostItem/PostItem';
import { getPostsThunk,selectPosts, selectCurrentPage, selectPageSize, PostType } from './postsSlice';
import styles from './Posts.module.css';



export const Posts = React.memo(() => {
    let posts = useAppSelector(selectPosts)
    let currentPage = useAppSelector(selectCurrentPage)
    let pageSize = useAppSelector(selectPageSize)

    let dispatch = useAppDispatch()

    let totalPostsCount = posts.length


    // onClick sort
    const newBaz = posts.slice()

    let SortArray = (param:any) => (x:any, y:any)=>{
    if (x[param] < y[param]) {return -1;}
    if (x[param] > y[param]) {return 1;}
    return 0;
}
     
    //   newBaz.sort(compare);
    console.log(newBaz.sort(SortArray('title')))


    // Do slices from origin posts
    let sliceStart = Math.ceil((currentPage - 1) * 100 / pageSize)
    let sliceEnd = currentPage * pageSize
    
    let postsOnPage = newBaz.slice(sliceStart, sliceEnd)

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
            <Paginator totalItemsCount={totalPostsCount}
                currentPage={currentPage}
                pageSize={pageSize} />
        </div>
    )
})