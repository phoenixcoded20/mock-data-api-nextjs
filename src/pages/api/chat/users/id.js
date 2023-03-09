import users from 'data/chat.json';
import cors from 'utils/cors';

export default async function handler(req, res) {
  await cors(req, res);
  const { id } = req.body;
  const index = users.findIndex((x) => x.id === id);
  return res.status(200).json(users[index]);
}
