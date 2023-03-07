import users from 'data/simple-card.json';
import cors from 'utils/cors';

export default async function handler(req, res) {
  await cors(req, res);
  return res.status(200).send({ users });
}
