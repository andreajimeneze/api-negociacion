import express from 'express';
import authRoutes from './routes/authRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import negotiationRoutes from './routes/negotiationRoutes.js';
import { sequelize } from './models/DbSequelize.js';
import serverless from "serverless-http";

import cors from 'cors';
import path from 'path';

const app = express();
const PORT = 3000;

app.use(cors({
  origin: '*', // Permite todos los orígenes
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true // Si necesitas cookies/auth
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use('/public', express.static(path.join(process.cwd(), 'public')));

app.use('/api', authRoutes );
app.use('/api/news', newsRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/negotiations', negotiationRoutes);

// Manejo de conexión a la base de datos
let isDatabaseConnected = false;

async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa');
    isDatabaseConnected = true;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    isDatabaseConnected = false;
  }
}

// Conectar a la base de datos al iniciar
connectDatabase();

app.get('/', (req, res) => {
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
});

export const handler = serverless(app);