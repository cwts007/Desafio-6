const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors'); // Permitir CORS para que el frontend pueda consumir la API
const { Pool } = require('pg');

// Configurar conexión a la base de datos PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'softjobs',
    password: 'CAMBIAR_AQUI_LA_CONTRASENA',  // Reemplaza con la contraseña de PostgreSQL
    port: 5432,
});

const app = express();
app.use(cors()); // Habilitar CORS para permitir solicitudes desde el frontend
app.use(express.json()); // Para manejar solicitudes JSON

const secretKey = 'CAMBIAR_AQUI_LA_LLAVE_SECRETA';  // Cambia esta clave secreta por una clave segura

// Ruta de prueba para verificar que el servidor está funcionando
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

// Ruta para registrar nuevos usuarios
app.post('/usuarios', async (req, res) => {
    const { email, password, rol, lenguage } = req.body;

    // Validar que todos los campos estén presentes
    if (!email || !password || !rol || !lenguage) {
        return res.status(400).json({ error: 'Faltan datos en el registro' });
    }

    try {
        // Encriptar la contraseña antes de almacenarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el nuevo usuario en la base de datos
        const result = await pool.query(
            'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *',
            [email, hashedPassword, rol, lenguage]
        );

        // Enviar respuesta con el usuario registrado
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
});

// Ruta para login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validar que los campos estén presentes
    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    try {
        // Buscar el usuario en la base de datos
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

        // Si el usuario no existe
        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }

        const user = result.rows[0];

        // Comparar la contraseña ingresada con la almacenada
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        // Generar el token JWT con el email del usuario
        const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' }); // Token válido por 1 hora

        // Enviar el token al cliente
        res.json({ token });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error en el login' });
    }
});

// Ruta protegida para obtener los datos del usuario autenticado
app.get('/usuarios', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Obtener el token del header Authorization

    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token, secretKey);

        // Buscar el usuario en la base de datos usando el email del token
        pool.query('SELECT * FROM usuarios WHERE email = $1', [decoded.email], (error, result) => {
            if (error) {
                return res.status(500).json({ error: 'Error en la base de datos' });
            }

            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            // Devolver los datos del usuario
            res.json(result.rows[0]);
        });
    } catch (error) {
        return res.status(403).json({ error: 'Token inválido' });
    }
});

// Levantar el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
