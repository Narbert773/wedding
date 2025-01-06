import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import guestRouter from './routes/guestRouter';
import kidsRouter from './routes/kidsRouter';
import textRouter from './routes/textRouter';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

app.use('/text', textRouter);
app.use('/guests', guestRouter);
app.use('/kids', kidsRouter);

async function initServer() {
  try {
    app.listen(PORT, () => console.log(`Свадьба состоится на порту ${PORT}`));
    app.get('/', (req: Request, res: Response) => {
      res.send('Свадьба на Express.js');
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error(err.message);
  }
}

initServer();
