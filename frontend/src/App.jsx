import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importación de todos los componentes de página
import Inicio from './components/Inicio.jsx';
import IngresoAsistente from './components/IngresoAsistente.jsx';
import Registro from './components/Registro.jsx';
import Login from './components/Login.jsx';
import Pasaporte from './components/Pasaporte.jsx';
import Escaner from './components/Escaner.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';

import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/ingresar" element={<IngresoAsistente />} />
                    <Route path="/registro" element={<Registro />} />
                    <Route path="/admin" element={<Login />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/pasaporte" element={<Pasaporte />} />
                    <Route path="/escaner/:eventoId" element={<Escaner />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;