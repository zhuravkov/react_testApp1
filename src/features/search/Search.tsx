import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { searching, setCurrentPage } from '../posts/postsSlice';
import styles from './Search.module.css';

export const Search = () => {

    const [tempSearch, setTempSearch] = useState<string>('')
    const dispatch = useAppDispatch()

    // on click dispathing search params and setCurrentPage on 1
    return (
        <div>
            <input
                placeholder='Поиск'
                value={tempSearch}
                onChange={(e) => { setTempSearch(e.target.value) }} />
            <button onClick={() => {
                dispatch(searching(tempSearch));
                dispatch(setCurrentPage(1))
            }}
            >Поиск</button>
        </div>
    )
}
