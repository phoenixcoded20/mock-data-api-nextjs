import { sub } from 'date-fns';
import { Chance } from 'chance';
import cors from 'utils/cors';

const chance = new Chance();

const productReviews = [
  {
    id: '1',
    rating: chance.floating({ min: 0.2, max: 5.0 }),
    review: chance.paragraph({ sentences: 2 }),
    date: sub(new Date(), { days: 0, hours: 1, minutes: 45 }),
    profile: {
      avatar: 'avatar-1.png',
      name: chance.name({ nationality: 'en' }),
      status: chance.bool()
    }
  },
  {
    id: '2',
    rating: chance.floating({ min: 0.1, max: 5.0 }),
    review: chance.paragraph({ sentences: 2 }),
    date: sub(new Date(), { days: 5, hours: 12, minutes: 55 }),
    profile: {
      avatar: 'avatar-2.png',
      name: chance.name({ nationality: 'en' }),
      status: chance.bool()
    }
  },
  {
    id: '3',
    rating: chance.floating({ min: 0.1, max: 5.0 }),
    review: chance.paragraph({ sentences: 2 }),
    date: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
    profile: {
      avatar: 'avatar-3.png',
      name: chance.name({ nationality: 'en' }),
      status: chance.bool()
    }
  }
];

export default async function handler(req, res) {
  await cors(req, res);
  return res.status(200).json({ productReviews });
}
