import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import ButtonControl from './Pages/button';
import Home from './Pages/Home';
import { Provider } from 'react-redux';
function App() {
    return (
        <div className="appContainer">
            <div className="homeButtonDiv">

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/buttonControl" element={<ButtonControl />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
