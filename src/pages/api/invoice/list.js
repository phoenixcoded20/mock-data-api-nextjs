import invoice from 'data/invoice.json';

import cors from 'utils/cors';

export default async function handler(req, res) {
  await cors(req, res);
  res.status(200).json({ invoice });
}
