import React from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import CollapsibleNav from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';

function App() {
    return (
        <BrowserRouter>
            <CollapsibleNav />
            <Footer />
        </BrowserRouter>
    );
}

export default App;
