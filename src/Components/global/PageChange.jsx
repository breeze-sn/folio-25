import React, { useEffect, useState } from 'react'
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

        useEffect(() => {
            if (pageChange.mode) {
                setShowBlock(true);
                setAnimationClass(styles.slidein);
                const slideInTimeout = setTimeout(() => {
                    navigate(pageChange.url);
                    window.scrollTo(0, 0);
                    setAnimationClass(styles.slideout);
                    const slideOutTimeout = setTimeout(() => {
                        setShowBlock(false);
                        setAnimationClass('');
                        dispatch({type: CHANGE_PAGE,payload: {url: pageChange.url,mode: false}});
                    }, 1000);

                    return () => clearTimeout(slideOutTimeout);
            }, 1000);
                return () => clearTimeout(slideInTimeout);
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
