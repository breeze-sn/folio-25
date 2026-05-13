import React from 'react';
import ReactDOM from 'react-dom/client';
import './poppins-fonts.css';
import './index.css';
import './fontEnforcer';
import App from './App.jsx';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { store, Persistor } from "./reducer.js";

// Disable right-click and developer tools
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Disable text selection and copying
document.addEventListener('selectstart', (e) => e.preventDefault());
document.addEventListener('copy', (e) => e.preventDefault());
document.addEventListener('cut', (e) => e.preventDefault());

document.addEventListener('keydown', (e) => {
  // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
  if (e.key === 'F12' || 
      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
      (e.ctrlKey && e.key === 'U')) {
    e.preventDefault();
    return false;
  }
  
  // Disable Ctrl+C (Copy), Ctrl+A (Select All)
  if (e.ctrlKey && (e.key === 'c' || e.key === 'a')) {
    e.preventDefault();
    return false;
  }
});

// Warning in console
console.log('%c⚠️ WARNING', 'color: red; font-size: 40px; font-weight: bold;');
console.log('%cThis is a browser feature intended for developers. Do not paste any code here.', 'font-size: 16px;');
console.log('%c© 2025 Simran Nagekar. All rights reserved.', 'font-size: 14px; color: gray;');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={Persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);