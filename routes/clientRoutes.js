import express from 'express';
import { getClients, getOneClient, createNewClient, editClient, eliminarCliente } from "../controllers/clientController.js";
import { createUploadMiddleware } from '../middlewares/multer.js';

const router = express.Router();
const uploadClients = createUploadMiddleware('clients');


router.get('/', getClients);
router.get('/:id', getOneClient);
router.post('/create', uploadClients.single('logo'), createNewClient);
router.put('/edit/:id', uploadClients.single('logo'), editClient);
router.delete('/delete/:id', eliminarCliente);

export default router;
