// frontend/src/components/Inicio.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Inicio.css';

const Inicio = () => {
    return (
        <div className="inicio-container">
            <h1 className="inicio-title">
                Bienvenido a tu <span>Pasaporte Digital</span>
            </h1>
            <div className="cards-container">
                <Link to="/admin" className="portal-card">
                    <div className="portal-card-icon">👤</div>
                    <h2 className="portal-card-title">Administrador</h2>
                </Link>

                {/* --- LÍNEA MODIFICADA --- */}
                <Link to="/ingresar" className="portal-card">
                    <div className="portal-card-icon">🎟️</div>
                    <h2 className="portal-card-title">Participante</h2>
                </Link>
            </div>
        </div>
    );
};

export default Inicio;