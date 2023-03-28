import cors from 'utils/cors';
import dashboard from 'data/dashboard.json';

export default async function handler(req, res) {
  await cors(req, res);
  return res.status(200).json({ dashboard });
}
