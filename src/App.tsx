import React from 'react';
import { Routes, Route} from "react-router-dom";
import './App.css';
import { Posts } from './features/posts/Posts';



function App() {
    return (
        <div className="App">
            <Routes >
                <Route path="/" element={<Posts />} />
            </Routes>
        </div>
    );
}

export default App;
