// frontend/src/components/Registro.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Registro.css';

const Registro = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        tipo_documento: 'Cédula de Ciudadanía',
        numero_documento: '',
        edad: '',
        sexo: '',
        grupo_poblacional: '',
        lugar_residencia: '',
        departamento_residencia: ''
    });
    const [feedback, setFeedback] = useState({ message: '', type: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/registro', formData);
            const numeroDocumento = response.data.numero_documento;
            navigate('/pasaporte', { state: { numero_documento: numeroDocumento } });
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error al registrar. Inténtalo de nuevo.';
            setFeedback({ message: errorMessage, type: 'error' });
        }
    };

    return (
        <div className="registro-container">
            <form className="registro-form" onSubmit={handleSubmit}>
                <h1 className="registro-title">Pasaporte Digital</h1>

                <div className="form-grid">
                    <div className="form-group">
                        <label>Tipo de documento</label>
                        <select name="tipo_documento" value={formData.tipo_documento} onChange={handleChange}>
                            <option>Cédula de Ciudadanía</option>
                            <option>Tarjeta de Identidad</option>
                            <option>Cédula de Extranjería</option>
                            <option>Pasaporte</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Número de documento</label>
                        <input type="text" name="numero_documento" value={formData.numero_documento} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Edad</label>
                        <input type="number" name="edad" value={formData.edad} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Sexo</label>
                        <select name="sexo" value={formData.sexo} onChange={handleChange} required>
                            <option value="">Seleccionar...</option>
                            <option>Masculino</option>
                            <option>Femenino</option>
                            <option>Otro</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Grupo poblacional (Opcional)</label>
                        <input type="text" name="grupo_poblacional" value={formData.grupo_poblacional} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Lugar de residencia</label>
                        <input type="text" name="lugar_residencia" value={formData.lugar_residencia} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Departamento</label>
                        <input type="text" name="departamento_residencia" value={formData.departamento_residencia} onChange={handleChange} required />
                    </div>
                </div>

                <button type="submit" className="registro-button">Generar mi Pasaporte</button>
                {feedback.message && (
                    <div className={`feedback-message ${feedback.type === 'error' ? 'error' : 'success'}`}>
                        {feedback.message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default Registro;