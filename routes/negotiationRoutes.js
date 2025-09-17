import express from 'express';
import { countNegotiations } from "../controllers/negotiationController.js";
const router = express.Router();

router.get('/', countNegotiations);

export default router;
