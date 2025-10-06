import cors from 'utils/cors';
import changeLog from 'data/change-log.json';

export default async function handler(req, res) {
  await cors(req, res);
  res.status(200).json({ changeLog });
}
