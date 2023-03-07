import cors from 'utils/cors';
import { v4 as UIDV4 } from 'uuid';
import addressList from 'data/address.json';
import fs from 'fs';

export default async function handler(req, res) {
  await cors(req, res);
  const data = req.body;
  let address = addressList;
  const { name, destination, building, street, city, state, country, post, phone, isDefault } = data;
  const newAddress = {
    id: UIDV4(),
    name,
    destination,
    building,
    street,
    city,
    state,
    country,
    post,
    phone,
    isDefault
  };

  if (isDefault) {
    address = address.map((item) => {
      if (item.isDefault === true) {
        return { ...item, isDefault: false };
      }
      return item;
    });
  }

  address = [...address, newAddress];
  await fs.writeFile('src/data/address.json', JSON.stringify(address), async (err) => {
    if (err) throw err;
    return res.status(200).json({ address });
  });
}
