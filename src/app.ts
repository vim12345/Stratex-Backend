import express from 'express';
import authRoutes from './routes/authRoutes';
import bookRoutes from './routes/bookRoutes';

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);

export default app;
