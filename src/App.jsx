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

function App() {
    return (
        <>
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
