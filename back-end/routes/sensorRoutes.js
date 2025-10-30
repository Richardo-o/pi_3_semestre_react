import express from 'express';
const sensorRoutes = express.Router();
import Authorization from '../middleware/Auth.js';
import sensorController from '../controllers/sensorController.js';

// Retorna a leitura mais recente de sensores por hortaliça
sensorRoutes.get('/sensores/latest', Authorization, sensorController.getLatest);

// Retorna histórico de leituras por hortaliça
sensorRoutes.get('/sensores/history', Authorization, sensorController.getHistory);

// (Opcional) Cria uma nova leitura de sensores
sensorRoutes.post('/sensores', Authorization, sensorController.createReading);

export default sensorRoutes;


