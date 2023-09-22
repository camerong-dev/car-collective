import React from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import CollapsibleNav from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <BrowserRouter>
            <CollapsibleNav />
        </BrowserRouter>
    );
}

export default App;
