// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// ... (importaciones de los otros componentes)
import ProtectedRoute from './components/ProtectedRoute.jsx'; // <-- 1. Importa el guardián
import AdminDashboard from './components/AdminDashboard.jsx';
import Escaner from './components/Escaner.jsx';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {/* --- Rutas Públicas --- */}
                    <Route path="/" element={<Inicio />} />
                    <Route path="/ingresar" element={<IngresoAsistente />} />
                    <Route path="/registro" element={<Registro />} />
                    <Route path="/admin" element={<Login />} />
                    <Route path="/pasaporte" element={<Pasaporte />} />

                    {/* --- Rutas Protegidas --- */}
                    <Route
                        path="/admin/dashboard"
                        element={
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/escaner/:eventoId"
                        element={
                            <ProtectedRoute>
                                <Escaner />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;