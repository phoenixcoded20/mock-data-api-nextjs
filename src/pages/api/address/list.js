import cors from 'utils/cors';
import address from 'data/address.json';

export default async function handler(req, res) {
  await cors(req, res);
  res.status(200).json({ address });
}
