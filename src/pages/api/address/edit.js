import addressList from 'data/address.json';
import cors from 'utils/cors';

export default async function handler(req, res) {
  await cors(req, res);
  const data = req.body;
  let address = addressList;
  if (data.isDefault) {
    address = address.map((item) => {
      if (item.isDefault === true) {
        return { ...item, isDefault: false };
      }
      return item;
    });
  }

  address = address.map((item) => {
    if (item.id === data.id) {
      return data;
    }
    return item;
  });

  return res.status(200).json({ address });
}
