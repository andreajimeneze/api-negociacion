import express from 'express';
import { getTeam, getMember, createNewMember, editMember, eliminarMiembro } from "../controllers/teamController.js";
import { createUploadMiddleware } from '../middlewares/multer.js';

const router = express.Router();

const uploadTeam = createUploadMiddleware('team');

router.get('/', getTeam);
router.get('/:id', getMember);
router.post('/create', uploadTeam.single('foto'), createNewMember);
router.put('/edit/:id', uploadTeam.single('foto'), editMember);
router.delete('/delete/:id', eliminarMiembro);


export default router;