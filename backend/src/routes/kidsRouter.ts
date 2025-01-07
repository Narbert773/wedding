import express, { Request, Response } from 'express';
import { CreateKidBody, UpdateKidBody } from '../interfaces/kid.interface';
const { Kid } = require('../../db/models');

const kidsRouter = express.Router();

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

kidsRouter.patch('/:id', async (req: Request<{ id: string }, {}, UpdateKidBody>, res: Response): Promise<void> => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;

  if (!firstName && !lastName && age) {
    res.status(400).json({ message: 'At least one field (firstName or lastName or age) is required' });
    return;
  }

  try {
    const kid = await Kid.findByPk(id);

    if (!kid) {
      res.status(404).json({ message: 'Guest not found' });
      return;
    }

    if (firstName) kid.firstName = firstName;
    if (lastName) kid.lastName = lastName;
    if (age) kid.age = age;

    await kid.save();

    res.status(200).json(kid);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unexpected error occurred.', error });
  }
});

export default kidsRouter;
