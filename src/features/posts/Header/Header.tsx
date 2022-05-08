import React from "react"
import { useAppDispatch } from "../../../app/hooks"
import { sortPosts } from "../postsSlice"

export const Header = () => {
    let dispatch = useAppDispatch()

    return (
        <tr>
            <th>
                <button onClick={()=> dispatch(sortPosts('id')) }>ID</button>
            </th>
            <th>
            <button onClick={()=> dispatch(sortPosts('title')) }>Заголовок</button>
            </th>
            <th>
                <button onClick={()=> dispatch(sortPosts('body')) }>Описание</button>
            </th>
        </tr>
    )
}
