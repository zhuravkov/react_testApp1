import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { searching } from '../posts/postsSlice';
import styles from './Search.module.css';

export const Search = () => {

    const [tempSearch, setTempSearch] = useState<string>('')
    const dispatch = useAppDispatch()

    return (
        <div>
            <input
                placeholder='Поиск'
                value={tempSearch}
                onChange={(e) => { setTempSearch(e.target.value) }} />
            <button onClick={() => dispatch(searching(tempSearch))}>Поиск</button>
        </div>
    )
}
