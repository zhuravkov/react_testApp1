import React from "react"
import { useAppDispatch } from "../../../app/hooks"
import { sortPosts } from "../postsSlice"
import styles from '.././Posts.module.css';

export const Header = () => {
    let dispatch = useAppDispatch()

    return (
        <tr>
            <th>
                <span className={styles.sorting} onClick={() => dispatch(sortPosts('id'))}>ID</span>
            </th>
            <th>
                <span className={styles.sorting} onClick={() => dispatch(sortPosts('title'))}>Заголовок</span>
            </th>
            <th>
                <span className={styles.sorting} onClick={() => dispatch(sortPosts('body'))}>Описание</span>
            </th>
        </tr>
    )
}
