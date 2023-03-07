import itemsData from 'data/kanban-items.json';
import cors from 'utils/cors';

export default async function handler(req, res) {
  await cors(req, res);
  return res.status(200).json({ items: itemsData });
}
