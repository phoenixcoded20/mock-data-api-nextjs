import cors from 'utils/cors';
import { products } from 'data/products';

export default async function handler(req, res) {
  await cors(req, res);
  res.status(200).json({ products });
}
