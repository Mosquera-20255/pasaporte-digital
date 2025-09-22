// backend/crearAdmin.js
const bcrypt = require('bcryptjs');

async function generarHash() {
    const username = 'admin';
    const passwordPlano = 'admin'; // La contraseña que quieres usar

    console.log(`Generando hash para la contraseña: "${passwordPlano}"...`);

    // Generamos el hash usando la misma librería de tu proyecto
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(passwordPlano, salt);

    console.log('\n--- COPIA Y EJECUTA ESTE COMANDO EN TU BASE DE DATOS ---');
    console.log(`
INSERT INTO administradores (username, password_hash, role) 
VALUES ('${username}', '${password_hash}', 'admin')
ON CONFLICT (username) 
DO UPDATE SET password_hash = EXCLUDED.password_hash;
    `);
    console.log('-----------------------------------------------------\n');
}

generarHash();