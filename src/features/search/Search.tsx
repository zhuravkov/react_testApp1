import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { searching, setCurrentPage } from '../posts/postsSlice';
import styles from './Search.module.css';
import SearchItem from './search.png'

export const Search = () => {

    const [tempSearch, setTempSearch] = useState<string>('')
    const dispatch = useAppDispatch()

    // ENTER press 
    let onEnter=(target:any)=> {
        dispatch(searching(tempSearch))
      }


    return (
        <div className={styles.search}>
            <input
                placeholder='Поиск'
                value={tempSearch}
                onChange={(e) => { setTempSearch(e.target.value) }}
                onKeyPress={event => event.key === "Enter" && onEnter(event.key)}
                />
                
            <img src={SearchItem} onClick={() => {
                dispatch(searching(tempSearch));
                dispatch(setCurrentPage(1))
            }}/>
        </div>
    )
}
