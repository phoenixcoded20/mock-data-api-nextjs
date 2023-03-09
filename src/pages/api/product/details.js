import { products } from 'data/products';
import cors from 'utils/cors';

export default async function handler(req, res) {
  await cors(req, res);
  const { id } = req.body;

  let results;
  if (id === 'default') {
    [results] = products;
  } else {
    [results] = products.filter((product) => product.id === Number(id));
  }

  return res.status(200).json(results);
}
