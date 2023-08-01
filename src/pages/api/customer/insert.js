import customers from 'data/customer.json';
import cors from 'utils/cors';

// ==============================|| MOCK SERVICES ||============================== //

export default async function handler(req, res) {
  await cors(req, res);
  const { list } = req.body;
  const newList = {
    ...list,
    id: customers.length + 1
  };
  customers.push(newList);
  return res.status(200).json(newList);
}
