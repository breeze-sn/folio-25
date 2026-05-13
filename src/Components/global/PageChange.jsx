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
    const timelineRef = useRef(null);
    const isAnimatingRef = useRef(false);

    useEffect(() => {
        if (pageChange.mode && !isAnimatingRef.current && screenRef.current) {
            isAnimatingRef.current = true;

            // Create a GSAP timeline for smooth animation
            const tl = gsap.timeline({
                onComplete: () => {
                    isAnimatingRef.current = false;
                    dispatch({type: CHANGE_PAGE, payload: {url: pageChange.url, mode: false}});
                }
            });

            // Show the overlay and animate it in from left
            tl.set(screenRef.current, { left: '-100vw' })
                .to(screenRef.current, {
                    left: 0,
                    duration: 0.8,
                    ease: 'power2.inOut'
                }, 0)
                .call(() => {
                    // Navigate while overlay is covering the page
                    navigate(pageChange.url);
                    window.scrollTo(0, 0);
                }, null, 0.4) // Happen midway through the slide-in
                // Animate overlay out to the right
                .to(screenRef.current, {
                    left: '100vw',
                    duration: 0.8,
                    ease: 'power2.inOut'
                }, 0.8);

            timelineRef.current = tl;
        }

        return () => {
            if (timelineRef.current) {
                timelineRef.current.kill();
            }
        };
    }, [pageChange.mode, pageChange.url, dispatch, navigate]);

    return (
        <>
            <div 
                ref={screenRef} 
                className={styles.screenblock}
                style={{ pointerEvents: 'none' }}
            />
        </>
    )
}

export default PageChange
