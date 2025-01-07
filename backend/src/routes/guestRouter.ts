import express, { Request, Response } from 'express';
import { CreateGuestBody, UpdateGuestBody } from '../interfaces/guest.interface';
const { Guest } = require('../../db/models');

const guestsRouter = express.Router();

guestsRouter
  .route('/')
  .get(async (req: Request, res: Response): Promise<void> => {
    try {
      const guests = await Guest.findAll({
        order: [['createdAt', 'ASC']],
      });
      res.json(guests);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .post(async (req: Request<{}, {}, CreateGuestBody>, res: Response): Promise<void> => {
    try {
      if (!req.body?.firstName || !req.body?.lastName) {
        res.status(400).json({ message: 'firstName and lastName are required' });
        return;
      }
      const { firstName, lastName } = req.body;
      const newGuest = await Guest.create({
        firstName,
        lastName,
      });
      res.status(201).json(newGuest);
    } catch (error) {
      res.status(500).json(error);
    }
  });

guestsRouter.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await Guest.destroy({ where: { id: req.params.id } });
    if (result === 0) {
      res.status(404).json({ message: 'Guest not found' });
    } else {
      res.sendStatus(200);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

guestsRouter.patch('/:id', async (req: Request<{ id: string }, {}, UpdateGuestBody>, res: Response): Promise<void> => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;

  if (!firstName && !lastName) {
    res.status(400).json({ message: 'At least one field (firstName or lastName) is required' });
    return;
  }

  try {
    const guest = await Guest.findByPk(id);

    if (!guest) {
      res.status(404).json({ message: 'Guest not found' });
      return;
    }

    if (firstName) guest.firstName = firstName;
    if (lastName) guest.lastName = lastName;

    await guest.save();

    res.status(200).json(guest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unexpected error occurred.', error });
  }
});

export default guestsRouter;
