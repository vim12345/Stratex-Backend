import { parse } from 'csv-parse';
import fs from 'fs';
import prisma from '../prismaClient';

export const parseCSV = (filePath: string, sellerId: number) => {
  fs.createReadStream(filePath)
    .pipe(parse({ columns: true }))
    .on('data', async (row) => {
      await prisma.book.create({
        data: {
          title: row.title,
          author: row.author,
          price: parseFloat(row.price),
          sellerId,
        },
      });
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
    });
};
