import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

async function initServer() {
  try {
    app.listen(PORT, () => console.log(`Свадьба состоится на пору ${PORT}`));
    app.get('/', (req: Request, res: Response) => {
      res.send('Свадьба на Express.js');
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error(err.message);
  }
}

initServer();
