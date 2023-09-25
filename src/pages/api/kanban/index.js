import cors from 'utils/cors';
import backlogs from 'data/kanban.json';

export default async function handler(req, res) {
  await cors(req, res);
  return res.status(200).json({ backlogs });
}
