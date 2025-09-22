// frontend/src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // <-- 1. Importa useNavigate
import './Login.css';

const Login = () => {
    const navigate = useNavigate(); // <-- 2. Inicializa
    // ... (el resto de los useState) ...
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await axios.post('http://localhost:5000/api/admin/login', { username, password });
            navigate('/admin/dashboard'); // <-- 3. Redirige al panel

        } catch (err) {
            setError('Usuario o contraseña incorrectos.');
        }
    };
    // ... (el resto del return) ...
    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h1 className="login-title">Acceso Staff</h1>
                <div className="input-group">
                    <label htmlFor="username">Usuario</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Ingresar</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default Login;