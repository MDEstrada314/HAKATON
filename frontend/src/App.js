import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './componets/login';
import Home from './componets/home';

function App() {

  return (
    <Router >
      <div>
       <Routes>
       <Route path="/" element={<Login />} /> 
       <Route path="/home" element={<Home />} /> 
       

        </Routes>






      </div>


    </Router>

  );
}

export default App;
