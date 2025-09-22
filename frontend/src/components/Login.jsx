// frontend/src/components/Login.jsx
// ... (importaciones)
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    // ... (useStates)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/admin/login', { username, password });

            // --- Lógica para guardar el Token ---
            const token = response.data.token;
            localStorage.setItem('admin_token', token); // Guardamos el token

            navigate('/admin/dashboard'); // Redirigimos al panel

        } catch (err) {
            setError('Usuario o contraseña incorrectos.');
        }
    };

    return ( /* ... El JSX del return no cambia ... */
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