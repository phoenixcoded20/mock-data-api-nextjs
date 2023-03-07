import cors from 'utils/cors';

let newShipping;

export default async function handler(req, res) {
  await cors(req, res);
  const { shipping, charge } = req.body;
  newShipping = 0;
  if (shipping > 0 && charge === 'free') {
    newShipping = -5;
  }
  if (charge === 'fast') {
    newShipping = 5;
  }
  return res.status(200).json({ shipping: charge === 'fast' ? 5 : 0, newShipping, type: charge });
}
