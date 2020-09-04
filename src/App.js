import './App.css';

import React from 'react';
import Calculator from './components/calculator/Calculator';

function App() {
    return (
        <div className="App">
            <h1>A fully functional calculator built with create-react-app!</h1>
            <Calculator />
            <p>
                Created by: <a href="https://www.linkedin.com/in/seth-bullock-b893961ab/">Seth David Bullock</a>
            </p>
            <p>
                Github repository: <a href="https://github.com/sedabull/calculator">https://github.com/sedabull/calculator</a>
            </p>
        </div>
    );//end return JSX
}//end App

export default App;