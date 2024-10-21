import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context";

createRoot(document.getElementById('root')).render(
    <Router>
        <AuthProviderWrapper>
            <App />
        </AuthProviderWrapper>
    </Router>
)