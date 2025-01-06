import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const textRouter = express.Router();

textRouter.route('/').get((req: Request, res: Response) => {
  const filePath = path.join(__dirname, '../data', 'text.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка сервера при чтении файла:', err);
      res.status(500).send('Ошибка сервера');
      return;
    }
    res.json(JSON.parse(data));
  });
});

export default textRouter;
