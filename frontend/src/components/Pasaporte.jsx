// frontend/src/components/Pasaporte.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
// LÍNEA CORREGIDA: Asegúrate de que diga "react-qr-code" exactamente así.
import QRCode from "react-qr-code";
import './Pasaporte.css';

const Pasaporte = () => {
    const location = useLocation();
    const { numero_documento } = location.state || {};

    if (!numero_documento) {
        return (
            <div className="pasaporte-container">
                <div className="pasaporte-card">
                    <h1 className="pasaporte-title">Error</h1>
                    <p className="pasaporte-subtitle">No se encontró un número de documento. Por favor, regístrate primero.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="pasaporte-container">
            <div className="pasaporte-card">
                <h1 className="pasaporte-title">Pasaporte Digital</h1>
                <p className="pasaporte-subtitle">FESTIVAL RECREARTE</p>
                <div className="qr-container">
                    <QRCode
                        value={numero_documento}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        viewBox={`0 0 256 256`}
                    />
                </div>
                <p className="documento-info">ID: {numero_documento}</p>
                <p className="instruccion">¡Presenta este código en la entrada del evento!</p>
            </div>
        </div>
    );
};

export default Pasaporte;