import React from "react"
import { PostType } from "../postsSlice"
import styles from '.././Posts.module.css';

export const PostItem:React.FC<PostType> = ({id, title, body}) => {

    return (
        <tr>
            <td className={styles.IdCol}>
                {id}
            </td>
            <td className={styles.Title}>
                {title}
            </td>
            <td className={styles.Body}>
                {body}
            </td>
        </tr>
    )
}