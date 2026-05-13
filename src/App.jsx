import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HelmetProvider } from 'react-helmet-async';

import "./App.css"
import Home from "./Pages/Home.jsx";
import PageChange from "./Components/global/PageChange.jsx";
import Navbar from "./Components/global/Navbar.jsx";
import GlobalFooter from "./Components/global/GlobalFooter.jsx";
import ProjectPage from "./Pages/ProjectPage.jsx";
import ProjectsPage from "./Pages/ProjectsPage.jsx";
import ContactPage from "./Pages/ContactPage.jsx";
import AboutPage from "./Pages/AboutPage.jsx";
import LoadingScreen from "./Components/global/LoadingScreen.jsx";

function App() {
    const [showLoading, setShowLoading] = useState(() => {
        // Only show loading screen on first visit
        if (typeof window !== 'undefined') {
            return !sessionStorage.getItem('loadingScreenShown');
        }
        return false;
    });

    useEffect(() => {
        if (showLoading) {
            sessionStorage.setItem('loadingScreenShown', 'true');
        }
    }, [showLoading]);

    return (
        <>
            {showLoading && <LoadingScreen onComplete={() => setShowLoading(false)} />}
            <HelmetProvider>
                <BrowserRouter>
                    <Navbar/>
                    <PageChange />
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/about" element={<AboutPage />}></Route>
                        <Route path="/project" element={<ProjectsPage />}></Route>
                        <Route path="/project/:index" element={<ProjectPage />}></Route>
                        <Route path="/contact" element={<ContactPage />}></Route>
                    </Routes>
                    <GlobalFooter/>
                </BrowserRouter>
            </HelmetProvider>
        </>
    )
}

export default App;
