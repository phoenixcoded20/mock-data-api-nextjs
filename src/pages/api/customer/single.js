import customers from 'data/customer.json';
import cors from 'utils/cors';

export default async function handler(req, res) {
  await cors(req, res);
  const data = req.body;
  const { id } = data;
  const index = customers.findIndex((x) => x.id.toString() === id.toString());

  return res.status(200).json(customers[index === -1 ? 0 : index]);
}
