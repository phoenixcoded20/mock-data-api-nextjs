import profilesData from 'data/kanban-profiles.json';
import cors from 'utils/cors';

export default async function handler(req, res) {
  await cors(req, res);
  return res.status(200).json({ profiles: profilesData });
}
