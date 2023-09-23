import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import CollapsibleNav from './components/NavBar';
import Footer from './components/Footer';
import PostCards from './components/Posts';



function App() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('8000-camerong-dev-car-collect-yhax1lcp0i.us2.codeanyapp.com/api/')
            .then((response) => {
                setData(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }, []);

    return (
        <BrowserRouter>
            <div>
                <CollapsibleNav />
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <PostCards data={data} />
                )}
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;