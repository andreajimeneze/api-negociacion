// app.js
import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import path from 'path';

import authRoutes from './routes/authRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import negotiationRoutes from './routes/negotiationRoutes.js';

import { sequelize } from './models/dbSequelizer.js';

const app = express();

// Middleware CORS
app.use(cors({
  origin: '*',
  methods: ['GET','POST','PUT','DELETE','OPTIONS','PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
}));

// Middleware para parsear JSON y URL encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Carpeta pública
app.use('/public', express.static(path.join(process.cwd(), 'public')));

// Rutas
app.use('/api', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/negotiations', negotiationRoutes);

// Conexión a la base de datos
let isDatabaseConnected = false;

async function connectDatabase() {
  if (!isDatabaseConnected) {
    try {
      await sequelize.authenticate();
      console.log('Conexión a la base de datos exitosa');
      isDatabaseConnected = true;
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error.message);
      isDatabaseConnected = false;
    }
  }
}

// Conectar al importar (Serverless)
connectDatabase();

// Ruta de prueba
app.get('/', async (req, res) => {
  try {
    await connectDatabase();
    res.send({
      message: 'Servidor Express con Sequelize está corriendo 🚀',
      endpoints: {
        auth: '/api',
        news: '/api/news',
        team: '/api/team',
        clients: '/api/clients',
        negotiations: '/api/negotiations'
      },
      database: isDatabaseConnected ? 'Conectada' : 'Desconectada'
    });
  } catch (err) {
    res.status(500).send({ error: 'No se pudo conectar a la base de datos', details: err.message });
  }
});

// Exportamos handler para Vercel
export default serverless(app);
