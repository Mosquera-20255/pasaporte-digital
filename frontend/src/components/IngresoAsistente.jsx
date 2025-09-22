// frontend/src/components/IngresoAsistente.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './IngresoAsistente.css';

const IngresoAsistente = () => {
    const navigate = useNavigate();
    const [numeroDocumento, setNumeroDocumento] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!numeroDocumento) return;

        try {
            // Intentamos encontrar al asistente
            const response = await axios.get(`http://localhost:5000/api/asistente/${numeroDocumento}`);

            // Si lo encontramos (código 200), lo llevamos a su pasaporte
            navigate('/pasaporte', { state: { numero_documento: response.data.numero_documento } });

        } catch (error) {
            // Si no lo encontramos (código 404), lo llevamos a la página de registro
            if (error.response && error.response.status === 404) {
                navigate('/registro');
            } else {
                // Manejar otros errores (ej. de red)
                console.error('Ocurrió un error:', error);
                alert('No se pudo conectar con el servidor. Inténtalo de nuevo.');
            }
        }
    };

    return (
        <div className="ingreso-container">
            <form className="ingreso-form" onSubmit={handleSubmit}>
                <h1 className="ingreso-title">Consulta tu Pasaporte</h1>
                <p>Ingresa tu número de documento para ver tu pasaporte QR o para registrarte por primera vez.</p>
                <div className="input-group">
                    <label htmlFor="numeroDocumento">Número de documento</label>
                    <input
                        type="text"
                        id="numeroDocumento"
                        value={numeroDocumento}
                        onChange={(e) => setNumeroDocumento(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="ingreso-button">Continuar</button>
            </form>
        </div>
    );
};

export default IngresoAsistente;