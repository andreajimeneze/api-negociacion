import express from 'express';
const router = express.Router();
import { getNews, getOneNews, createNews, editNews, deleteNews } from "../controllers/newsController.js";
import { createUploadMiddleware } from '../middlewares/multer.js';

const uploadNews = createUploadMiddleware('news');

router.get('/', getNews);
router.get('/:id', getOneNews);
router.post('/create', uploadNews.single('imagen'), createNews);
router.put('/edit/:id', uploadNews.single('imagen'), editNews);
router.delete('/delete/:id',  deleteNews);

export default router;
