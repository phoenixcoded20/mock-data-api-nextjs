import cors from 'utils/cors';
import widget from 'data/widget.json';

export default async function handler(req, res) {
  await cors(req, res);
  return res.status(200).json({ widget });
}
