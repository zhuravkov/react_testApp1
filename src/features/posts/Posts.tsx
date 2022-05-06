import React, { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import styles from './Posts.module.css';

import { getPostsThunk, selectPosts } from './postsSlice';




export const Posts = () => {
    const posts = useAppSelector(selectPosts)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getPostsThunk())
    },[])
    
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        ID
                    </th>
                    <th>
                        Заголовок
                    </th>
                    <th>
                        Описание
                    </th>
                </tr>
            </thead>
            <tbody>
                {posts.map(p =>
                    <tr key={p.id}>
                        <td>
                            {p.id}
                        </td>
                        <td>
                            {p.title}
                        </td>
                        <td>
                            {p.body}
                        </td>
                    </tr>
                )
                }
            </tbody>

        </table>
    )
}