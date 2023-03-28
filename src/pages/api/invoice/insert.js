import invoice from 'data/invoice.json';
import cors from 'utils/cors';

// ==============================|| MOCK SERVICES ||============================== //

export default async function handler(req, res) {
  await cors(req, res);
  const { list } = req.body;
  const newList = {
    ...list,
    id: invoice.length + 1
  };
  invoice.push(newList);
  return res.status(200).json(newList);
}
