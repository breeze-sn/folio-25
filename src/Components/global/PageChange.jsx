import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import styles from "./pagechange.module.css"
import { useNavigate } from 'react-router-dom';
import { CHANGE_PAGE } from '../../store/types';

function PageChange() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pageChange = useSelector((state) => state.globalReducer.pageChange);

    const [animationClass, setAnimationClass] = useState('');
    const [showBlock, setShowBlock] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (pageChange.mode) {
            setShowBlock(true);
            setAnimationClass(styles.slidein);
            
            timeoutRef.current = setTimeout(() => {
                navigate(pageChange.url);
                window.scrollTo(0, 0);
                setAnimationClass(styles.slideout);
                
                timeoutRef.current = setTimeout(() => {
                    setShowBlock(false);
                    setAnimationClass('');
                    dispatch({type: CHANGE_PAGE, payload: {url: pageChange.url, mode: false}});
                }, 1000);
            }, 1000);

            return () => {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
            };
        }
    }, [pageChange.mode, pageChange.url, dispatch, navigate]);

    return (
        <>
            {showBlock && (
                <div className={`${styles.screenblock} ${animationClass}`}></div>
            )}
        </>
    )
}

export default PageChange
