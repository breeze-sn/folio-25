import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import gsap from 'gsap';

import styles from "./pagechange.module.css"
import { useNavigate } from 'react-router-dom';
import { CHANGE_PAGE } from '../../store/types';

function PageChange() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pageChange = useSelector((state) => state.globalReducer.pageChange);

    const screenRef = useRef(null);
    const isAnimatingRef = useRef(false);
    const hasNavigatedRef = useRef(false);

    useEffect(() => {
        if (pageChange.mode && !isAnimatingRef.current && screenRef.current) {
            isAnimatingRef.current = true;
            hasNavigatedRef.current = false;

            gsap.killTweensOf(screenRef.current);
            gsap.set(screenRef.current, { xPercent: -120 });

            gsap.to(screenRef.current, {
                xPercent: 120,
                duration: 1.1,
                ease: 'power3.inOut',
                onUpdate: () => {
                    if (!hasNavigatedRef.current && gsap.getProperty(screenRef.current, 'xPercent') >= 0) {
                        hasNavigatedRef.current = true;
                        navigate(pageChange.url);
                        window.scrollTo(0, 0);
                    }
                },
                onComplete: () => {
                    isAnimatingRef.current = false;
                    dispatch({type: CHANGE_PAGE, payload: {url: pageChange.url, mode: false}});
                }
            });
        }
    }, [pageChange.mode, pageChange.url, dispatch, navigate]);

    return (
        <>
            <div 
                ref={screenRef} 
                className={styles.screenblock}
                style={{ pointerEvents: 'none' }}
            />
            {pageChange.mode && (
                <div className={styles.labelWrap} aria-hidden="true">
                    <span className={styles.label}>Loading page</span>
                </div>
            )}
        </>
    )
}

export default PageChange
