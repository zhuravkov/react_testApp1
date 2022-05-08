import { useEffect, useState } from 'react';
import { setCurrentPage } from '../posts/postsSlice';
import { useAppDispatch } from '../../app/hooks';
import { useSearchParams } from 'react-router-dom';
import s from './Paginator.module.css';

type PropsType = {
    totalItemsCount: number
    currentPage: number
    pageSize: number

}


export const Paginator: React.FC<PropsType> = ({ totalItemsCount, currentPage, pageSize }) => {

    const dispatch = useAppDispatch()
    let portionSize = 5

    // count all pages 
    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    // Dell pages on portions 
    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);

    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    // Read Query Params
    const [searchParams, setSearchParams] = useSearchParams()
    let pageInParams = Number(searchParams.get("page"))

    // dispatch CurrentPage from params and sets portionNumber
    useEffect(() => {
        if (pageInParams) {
            dispatch(setCurrentPage(pageInParams))
            let a=Math.ceil(pageInParams / portionSize)
            setPortionNumber(a)
        }
    }, [pageInParams,dispatch,setPortionNumber,portionSize])

    // Paginator's Current Page put in PARAMS
    useEffect(() => {
        setSearchParams({ page: `${currentPage}` })
    }, [currentPage,setSearchParams])


    return <div>
        <button onClick={() => dispatch(setCurrentPage(currentPage - 1))} 
        disabled={currentPage === leftPortionPageNumber} >Назад</button>

        {portionNumber > 1 &&
            <button onClick={() => {
                setPortionNumber(portionNumber - 1);
                dispatch(setCurrentPage(leftPortionPageNumber - 1))
            }} >...</button>}

        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => {
                return <span key={p} className={`${currentPage === p ? s.selectedPage : s.pageNumber}`}
                    onClick={(e) => { dispatch(setCurrentPage(p)) }}>{p}</span>
            })}

        {portionCount > portionNumber &&
            <button onClick={() => {
                setPortionNumber(portionNumber + 1);
                dispatch(setCurrentPage(rightPortionPageNumber + 1))
            }} >...</button>}

        <button onClick={() => dispatch(setCurrentPage(currentPage + 1))} 
        disabled={currentPage === rightPortionPageNumber
            || currentPage === pages.length
            || !pages.length}>Далее</button>
    </div>
}
