/*
 * main.jsx — the entry point (like `public static void main` in Java).
 * It finds <div id="root"> in index.html and tells React to render <App/> into it.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles.css'; // global styles, loaded once for the whole site

ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode only runs in development: it double-checks components
  // to warn you about common mistakes. It does nothing in production.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
