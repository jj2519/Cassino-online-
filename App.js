import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Roleta from './components/Roleta';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Login</Link> | 
        <Link to="/cadastro">Cadastro</Link> | 
        <Link to="/roleta">Roleta</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/roleta" element={<Roleta />} />
      </Routes>
    </Router>
  );
}

export default App;