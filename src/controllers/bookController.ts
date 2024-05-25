import { Request, Response } from 'express';
import prisma from '../prismaClient';
import { parseCSV } from '../utils/csvParser';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

export const uploadBooks = [upload.single('file'), (req: Request, res: Response) => {
  const filePath = req.file.path;
  const user = (req as any).user;

  parseCSV(filePath, user.userId);
  res.status(200).json({ message: 'File uploaded and processed' });
}];

export const getBooks = async (req: Request, res: Response) => {
  const books = await prisma.book.findMany();
  res.json(books);
};

export const getBookById = async (req: Request, res: Response) => {
  const book = await prisma.book.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.json(book);
};

export const editBook = async (req: Request, res: Response) => {
  const { title, author, price } = req.body;
  const user = (req as any).user;
  const bookId = parseInt(req.params.id);

  const book = await prisma.book.findUnique({ where: { id: bookId } });

  if (!book || book.sellerId !== user.userId) {
    return res.status(403).json({ error: 'Access denied' });
  }

  const updatedBook = await prisma.book.update({
    where: { id: bookId },
    data: { title, author, price },
  });

  res.json(updatedBook);
};

export const deleteBook = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const bookId = parseInt(req.params.id);

  const book = await prisma.book.findUnique({ where: { id: bookId } });

  if (!book || book.sellerId !== user.userId) {
    return res.status(403).json({ error: 'Access denied' });
  }

  await prisma.book.delete({ where: { id: bookId } });
  res.status(204).send();
};
