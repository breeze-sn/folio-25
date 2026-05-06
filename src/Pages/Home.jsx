import { useState, useEffect, useRef } from 'react'
import Navbar from "../Components/global/Navbar"
import styles from "./Home.module.css"
import ProjectCard from "../Components/ProjectCard"
import HomeFooter from "../Components/global/HomeFooter"
import SEO from "../Components/global/SEO"

import projects from '../store/projects.json' with { type: 'json' };
import Expertise from '../store/Expertise.json' with { type: 'json' };
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_PAGE } from "../store/types";


import * as images from "../Images"

function Home() {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.themeReducer.mode);
    const [visibleSections, setVisibleSections] = useState([0])
    const sectionRefs = useRef([])

    const changepage = (path) => {
        dispatch({ type: CHANGE_PAGE, payload: { url: path, mode: true } });
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.dataset.index)
                        setVisibleSections((prev) => 
                            !prev.includes(index) ? [...prev, index] : prev
                        )
                    }
                })
            },
            { threshold: 0.1, rootMargin: '50px' }
        )

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref)
        })

        return () => observer.disconnect()
    }, [])

    return (
        <>
            <SEO 
                title="Folio'25 - Simran Nagekar"
                description="Portfolio of Simran Nagekar - Game Experience Designer, Design Generalist & Creative Technology Explorer. Explore innovative game design projects and interactive experiences."
                url="https://simrann.dev/"
            />
            <Navbar />
            <div className={`${styles.mainbox}`} data-theme={theme}>
                <div 
                    ref={(el) => (sectionRefs.current[0] = el)}
                    data-index="0"
                    className={`${styles.section} ${styles.dashboard} ${styles.sectionWrapper} ${visibleSections.includes(0) ? styles.visible : ''}`}
                >
                    <h1>port<span>folio</span>.</h1>
                    <section>
                        <p></p>
                        <span>Game Experience Designer</span>
                    </section>
                </div>
                <div 
                    ref={(el) => (sectionRefs.current[1] = el)}
                    data-index="1"
                    className={`${styles.section} ${styles.about} ${styles.sectionWrapper} ${visibleSections.includes(1) ? styles.visible : ''}`}
                >
                    <div className={`${styles.left}`}>
                        <img src={images.PROFILE_VECTOR} alt="Error" style={theme === "dark" ? {filter: "invert(1)"}:null}/>
                    </div>
                    <div className={styles.right}>
                        <section>
                            <div className={styles.aboutSection}>
                                <h3 className={styles.aboutTitle}>About</h3>
                                <h1 className={styles.name}>Simran Nagekar</h1>
                                <p className={styles.subtitle}>
                                    Design Generalist & Creative Technology Explorer.
                                </p>
                            </div>

                            {/* Expertise Section */}
                            <div className={styles.expertiseSection}>
                                <h3 className={styles.expertiseTitle}>Expertise</h3>
                                <div className={styles.grid}>
                                    {
                                        Expertise.map((item)=>{
                                            return(
                                                <div>
                                                    <div className={styles.expertiseContent}>
                                                        <h4 className={styles.expertiseHeading}>{item.name}</h4>
                                                        <p className={styles.expertiseText}>
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <div 
                    ref={(el) => (sectionRefs.current[2] = el)}
                    data-index="2"
                    className={`${styles.section} ${styles.projects} ${styles.sectionWrapper} ${visibleSections.includes(2) ? styles.visible : ''}`}
                >
                    <div className={styles.header}>Projects</div>
                    {
                        projects.slice(0, 2).map((project, index) => {
                            return (
                                <ProjectCard key={index} project={project} index={index + 1}></ProjectCard>
                            )
                        })
                    }
                    <div className={styles.viewAllContainer}>
                        <div className={styles.more}>THERE'S MORE</div>
                        <div onClick={() => changepage('/project')} className={styles.viewAllLink}>view all projects &rarr;</div>
                    </div>
                </div>
                <div 
                    ref={(el) => (sectionRefs.current[3] = el)}
                    data-index="3"
                    className={`${styles.mobileFooterSection} ${styles.sectionWrapper} ${visibleSections.includes(3) ? styles.visible : ''}`}
                >
                    <div className={styles.footerTitle}>Quick Links</div>
                    <div className={styles.footerLinks}>
                        <a href="/about" onClick={(e) => { e.preventDefault(); changepage('/about'); }}>about</a>
                        <a href="/project" onClick={(e) => { e.preventDefault(); changepage('/project'); }}>projects</a>
                        <a href="/contact" onClick={(e) => { e.preventDefault(); changepage('/contact'); }}>contact</a>
                    </div>
                </div>
                <HomeFooter />
            </div>
        </>
    )
}

export default Home