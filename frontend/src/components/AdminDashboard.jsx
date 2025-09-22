// frontend/src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/eventos');
                setEventos(response.data);
            } catch (error) {
                console.error("Error al cargar eventos:", error);
            }
        };
        fetchEventos();
    }, []);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Panel de Eventos</h1>
            <div className="eventos-lista">
                {eventos.map((evento) => (
                    <Link to={`/escaner/${evento.id}`} key={evento.id} className="evento-card">
                        <div className="evento-info">
                            <h3>{evento.nombre_evento}</h3>
                            <p>{new Date(evento.fecha_evento).toLocaleDateString()}</p>
                        </div>
                        <span className="evento-scan-btn">Escanear</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;