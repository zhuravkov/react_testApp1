import React from "react"
import { PostType } from "../postsSlice"


export const PostItem:React.FC<PostType> = ({id, title, body}) => {

    return (
        <tr>
            <td>
                {id}
            </td>
            <td>
                {title}
            </td>
            <td>
                {body}
            </td>
        </tr>
    )
}