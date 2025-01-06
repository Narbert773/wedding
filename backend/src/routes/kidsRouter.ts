import express, { Request, Response } from 'express';
const { Kid } = require('../../db/models');

const kidsRouter = express.Router();

interface CreateKidBody {
  firstName: string;
  lastName: string;
  age: number;
}

kidsRouter
  .route('/')
  .get(async (req: Request, res: Response): Promise<void> => {
    try {
      const kids = await Kid.findAll({
        order: [['createdAt', 'DESC']],
      });
      res.json(kids);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  })
  .post(async (req: Request<{}, {}, CreateKidBody>, res: Response): Promise<void> => {
    try {
      const { firstName, lastName, age } = req.body;

      if (!firstName || !lastName || age == null) {
        res.status(400).json({ message: 'firstName, lastName, and age are required' });
        return;
      }

      const newKid = await Kid.create({
        firstName,
        lastName,
        age,
      });

      res.status(201).json(newKid);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });

kidsRouter.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    await Kid.destroy({ where: { id: req.params.id } });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(200);
  }
});

export default kidsRouter;
