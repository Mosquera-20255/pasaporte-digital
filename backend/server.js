// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // <-- 1. Importa la nueva librería
const { Pool } = require('pg');

// ... (El resto de la configuración inicial no cambia) ...
const app = express();
const PORT = process.env.PORT || 5000;
const pool = new Pool({ /* ... */ });
app.use(cors());
app.use(express.json());


// --- RUTA DE LOGIN PARA ADMINISTRADORES (MODIFICADA) ---
app.post('/api/admin/login', async (req, res) => {
    const username = req.body.username.trim();
    const password = req.body.password.trim();

    try {
        const result = await pool.query('SELECT * FROM administradores WHERE username = $1', [username]);
        const admin = result.rows[0];

        if (!admin) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const isMatch = await bcrypt.compare(password, admin.password_hash);

        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // --- 2. Lógica para crear el Token ---
        const payload = {
            id: admin.id,
            username: admin.username,
            role: admin.role
        };

        // El token expira en 8 horas. El 'SECRET' debería ser una cadena compleja en tu archivo .env
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'un-secreto-muy-seguro-por-defecto', { expiresIn: '8h' });

        res.status(200).json({
            message: 'Login exitoso',
            token: token // <-- 3. Envía el token al frontend
        });
        // ------------------------------------

    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// ... (El resto de las rutas no cambian) ...

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // <-- 1. Importa la nueva librería
const { Pool } = require('pg');

// ... (El resto de la configuración inicial no cambia) ...
const app = express();
const PORT = process.env.PORT || 5000;
const pool = new Pool({ /* ... */ });
app.use(cors());
app.use(express.json());


// --- RUTA DE LOGIN PARA ADMINISTRADORES (MODIFICADA) ---
app.post('/api/admin/login', async (req, res) => {
    const username = req.body.username.trim();
    const password = req.body.password.trim();

    try {
        const result = await pool.query('SELECT * FROM administradores WHERE username = $1', [username]);
        const admin = result.rows[0];

        if (!admin) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const isMatch = await bcrypt.compare(password, admin.password_hash);

        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // --- 2. Lógica para crear el Token ---
        const payload = {
            id: admin.id,
            username: admin.username,
            role: admin.role
        };

        // El token expira en 8 horas. El 'SECRET' debería ser una cadena compleja en tu archivo .env
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'un-secreto-muy-seguro-por-defecto', { expiresIn: '8h' });

        res.status(200).json({
            message: 'Login exitoso',
            token: token // <-- 3. Envía el token al frontend
        });
        // ------------------------------------

    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// ... (El resto de las rutas no cambian) ...

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});