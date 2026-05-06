import React, { useEffect, useState } from 'react'
import styles from "./Navbar.module.css"
import Navitem from './Navitem'
import { useDispatch, useSelector } from 'react-redux'
import { CHANGE_PAGE, CHANGETHEME } from '../../store/types'
import * as images from "../../Images/index"

import Icon from './Icon'

function Navbar() {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.themeReducer.mode)
    const [menuOpen, setMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            
            // Hide navbar on scroll up, show on scroll down
            if (scrollY > lastScrollY && scrollY > 100) {
                // Scrolling up - hide navbar
                setIsVisible(false);
            } else {
                // Scrolling down - show navbar
                setIsVisible(true);
            }
            
            setLastScrollY(scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        handleScroll(); // Initial check

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, [lastScrollY]);

    const Navlinks = [
        {
            title: "About",
            link: "/about"
        },
        {
            title: "Projects",
            link: "/project"
        },
        {
            title: "Contact",
            link: "/contact"
        }
    ]

    const changepage = (path) => {
        dispatch({ type: CHANGE_PAGE, payload: { url: path, mode: true } });
        setMenuOpen(false); // Close menu when navigating
    }

    const onToggle = () => {
        dispatch({ type: CHANGETHEME, payload: null });
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <>
            <div className={`${styles.navcontainer} ${!isVisible ? styles.navHidden : ''}`} data-theme={theme}>
                <section>
                    <p onClick={() => { changepage("/") }}>Simran Nagekar</p>
                </section>
                <section className={styles.desktopNav}>
                    {
                        Navlinks.map((item, key) => {
                            return (
                                <Navitem key={key} title={item.title} onclick={() => { changepage(item.link) }}></Navitem>
                            )
                        })
                    }
                    {/* <Toggle onToggle={onToggle}/> */}
                    <div className={styles.box} onClick={onToggle}>
                        <Icon DarkMode={images.DARKMODE} LightMode={images.LIGHTMODE}/>
                        <span>
                            {
                                theme === "light" ? "Light" : "Dark"
                            }
                        </span>
                    </div>
                </section>
                <section className={styles.mobileNav}>
                    <div className={styles.box} onClick={onToggle}>
                        <Icon DarkMode={images.DARKMODE} LightMode={images.LIGHTMODE}/>
                    </div>
                    <div className={styles.hamburger} onClick={toggleMenu}>
                        <img src={menuOpen ? images.CLOSE : images.HAMBURGER} alt="Menu" />
                    </div>
                </section>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`} data-theme={theme}>
                <div className={styles.menuLinks}>
                    {
                        Navlinks.map((item, key) => {
                            return (
                                <div key={key} className={styles.menuItem} onClick={() => { changepage(item.link) }}>
                                    {item.title.toLowerCase()}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Navbar
