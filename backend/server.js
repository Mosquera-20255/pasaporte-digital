require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de la Base de Datos
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Middlewares
app.use(cors());
app.use(express.json());

// --- RUTA DE LOGIN PARA ADMINISTRADORES ---
app.post('/api/admin/login', async (req, res) => {
    // CORRECCIÓN: Limpiamos los espacios en blanco del input
    const username = req.body.username.trim();
    const password = req.body.password.trim();

    if (!username || !password) {
        return res.status(400).json({ message: 'El usuario y la contraseña son requeridos.' });
    }

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

        res.status(200).json({ message: 'Login exitoso', user: { username: admin.username, role: admin.role } });

    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// --- RUTA DE REGISTRO PARA ASISTENTES PÚBLICOS ---
app.post('/api/registro', async (req, res) => {
    const {
        tipo_documento,
        numero_documento,
        edad,
        sexo,
        grupo_poblacional,
        lugar_residencia,
        departamento_residencia
    } = req.body;

    if (!tipo_documento || !numero_documento || !edad || !sexo || !lugar_residencia || !departamento_residencia) {
        return res.status(400).json({ message: 'Todos los campos obligatorios deben ser completados.' });
    }

    try {
        const query = `
            INSERT INTO asistentes (tipo_documento, numero_documento, edad, sexo, grupo_poblacional, lugar_residencia, departamento_residencia)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING numero_documento;
        `;
        const values = [tipo_documento, numero_documento, edad, sexo, grupo_poblacional, lugar_residencia, departamento_residencia];
        const result = await pool.query(query, values);
        res.status(201).json({
            message: '¡Registro exitoso!',
            numero_documento: result.rows[0].numero_documento
        });
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({ message: 'El número de documento ya se encuentra registrado.' });
        }
        console.error('Error en el registro:', error);
        res.status(500).json({ message: 'Error interno del servidor. Por favor, inténtalo de nuevo.' });
    }
});

// --- RUTA PARA VERIFICAR SI UN ASISTENTE EXISTE ---
app.get('/api/asistente/:numero_documento', async (req, res) => {
    const { numero_documento } = req.params;
    try {
        const result = await pool.query('SELECT numero_documento FROM asistentes WHERE numero_documento = $1', [numero_documento]);
        if (result.rows.length > 0) {
            res.status(200).json({
                message: 'Asistente encontrado.',
                numero_documento: result.rows[0].numero_documento
            });
        } else {
            res.status(404).json({ message: 'Asistente no registrado.' });
        }
    } catch (error) {
        console.error('Error al verificar asistente:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

// --- RUTA PARA OBTENER LA LISTA DE EVENTOS ---
app.get('/api/eventos', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, nombre_evento, fecha_evento FROM eventos ORDER BY fecha_evento ASC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error al obtener eventos:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

// --- RUTA PARA VALIDAR QR Y REGISTRAR ASISTENCIA ---
app.post('/api/asistencia', async (req, res) => {
    const { numero_documento, evento_id } = req.body;
    if (!numero_documento || !evento_id) {
        return res.status(400).json({ message: 'Faltan datos (documento o evento).' });
    }
    try {
        const asistenteResult = await pool.query('SELECT id FROM asistentes WHERE numero_documento = $1', [numero_documento]);
        if (asistenteResult.rows.length === 0) {
            return res.status(404).json({ message: 'Asistente no encontrado. Este pasaporte no es válido.' });
        }
        const asistente_id = asistenteResult.rows[0].id;
        const insertQuery = `
            INSERT INTO asistencia (asistente_id, evento_id) VALUES ($1, $2) RETURNING id;
        `;
        await pool.query(insertQuery, [asistente_id, evento_id]);
        res.status(201).json({ message: `Asistencia registrada con éxito para el documento ${numero_documento}.` });
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({ message: `Este pasaporte ya fue escaneado para este evento.` });
        }
        console.error('Error al registrar asistencia:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});