import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { sellerMiddleware } from '../middleware/sellerMiddleware';
import { uploadBooks, getBooks, getBookById, editBook, deleteBook } from '../controllers/bookController';

const router = Router();

router.get('/', authMiddleware, getBooks);
router.get('/:id', authMiddleware, getBookById);
router.post('/upload', authMiddleware, sellerMiddleware, uploadBooks);
router.put('/:id', authMiddleware, sellerMiddleware, editBook);
router.delete('/:id', authMiddleware, sellerMiddleware, deleteBook);

export default router;
